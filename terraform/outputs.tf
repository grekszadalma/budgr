output "cloudfront_url" {
  value = aws_cloudfront_distribution.cdn.domain_name
}

output "cloudfront_id" {
  value = aws_cloudfront_distribution.cdn.id
}

output "frontend_domain" {
  value = "https://budgr.site"
}

output "frontend_www_domain" {
  value = "https://www.budgr.site"
}

output "api_domain" {
  value = "https://api.budgr.site"
}

output "route53_nameservers" {
  value = aws_route53_zone.main.name_servers
}