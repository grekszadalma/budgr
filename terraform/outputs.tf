output "ec2_ip" {
  value = aws_instance.app.public_ip
}

output "cloudfront_id" {
  value = aws_cloudfront_distribution.cdn.id
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.cdn.domain_name
}