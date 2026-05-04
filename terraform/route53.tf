resource "aws_route53_zone" "main" {
  name = "budgr.site"
}

resource "aws_route53_record" "frontend_root" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "budgr.site"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "frontend_www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.budgr.site"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "api.budgr.site"
  type    = "A"
  ttl     = 300
  records = [aws_instance.app.public_ip]
}