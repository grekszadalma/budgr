resource "aws_db_instance" "postgres" {
  engine         = "postgres"
  instance_class = "db.t3.micro"

  allocated_storage = 20
  db_name           = "mydb"
  username          = "postgres"
  password          = "postgres123"

  skip_final_snapshot = true
  publicly_accessible = false
}