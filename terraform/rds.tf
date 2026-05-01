resource "aws_db_instance" "postgres" {
  engine         = "postgres"
  instance_class = "db.t3.micro"

  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]


  allocated_storage = 20
  db_name           = "budget_management"
  username          = "postgres"
  password          = "postgres123"

  skip_final_snapshot = true
  publicly_accessible = false
}