package com.budgr.demo.services;

import com.budgr.demo.models.SourceItem;
import com.budgr.demo.models.WishListItem;
import com.budgr.demo.repositories.SourceItemRepository;
import com.budgr.demo.repositories.WishListItemRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class SourceItemService {


    private WishListItemRepository wishListItemRepository;
    private SourceItemRepository sourceItemRepository;

    @Autowired
    public void SourceItemService(WishListItemRepository wishListItemRepository, SourceItemRepository sourceItemRepository) {
        this.wishListItemRepository = wishListItemRepository;
        this.sourceItemRepository = sourceItemRepository;
    }

    private final Duration PRICE_REFRESH_INTERVAL = Duration.ofHours(24);

    public List<SourceItem> getPricesForItem(String itemName, String itemCategory) throws RuntimeException {
        WishListItem item = wishListItemRepository.findByNameAndCategory(itemName, itemCategory).orElseThrow(() -> new RuntimeException("Wishlist item not found"));

        boolean needsRefresh = sourceItemRepository.findAllByWishListItem(item).stream()
                .anyMatch(p -> p.getLastUpdated() == null ||
                        Duration.between(p.getLastUpdated(), LocalDateTime.now()).compareTo(PRICE_REFRESH_INTERVAL) > 0);

        if (needsRefresh || sourceItemRepository.findAllByWishListItem(item).isEmpty()) {
            // Call Python scraper
            List<Map<String, String>> pythonResults = callPythonScraper(itemName, itemCategory);

            for (Map<String, String> result : pythonResults) {

                String url = result.get("link");
                String price = result.get("price");

                SourceItem si = new SourceItem();

                si.setProductUrl(url);
                si.setPrice(price);
                si.setLastUpdated(LocalDateTime.now());
                si.setWishListItem(item);
                sourceItemRepository.save(si);
            }
        }

        return sourceItemRepository.findAllByWishListItem(item);
    }

    private List<Map<String, String>> callPythonScraper(String productName, String category) {
        try {
            String apiUrl = "http://python-service:5000/prices?name=" +
                    URLEncoder.encode(productName, StandardCharsets.UTF_8) +
                    "&category=" + URLEncoder.encode(category, StandardCharsets.UTF_8);

            HttpURLConnection con = (HttpURLConnection) new URL(apiUrl).openConnection();
            con.setRequestMethod("GET");
            con.setConnectTimeout(10000);
            con.setReadTimeout(30000);

            try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = in.readLine()) != null) response.append(line);

                ObjectMapper mapper = new ObjectMapper();
                return mapper.readValue(response.toString(), new TypeReference<List<Map<String, String>>>() {});
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
