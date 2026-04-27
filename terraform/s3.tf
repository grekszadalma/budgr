resource "aws_s3_bucket" "frontend" {
  bucket = "my-app-frontend-unique-12345"
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls   = false
  block_public_policy = false
}