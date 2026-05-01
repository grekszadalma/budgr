resource "aws_instance" "app" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  subnet_id                   = aws_subnet.public.id
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]

  user_data = file("user_data.sh")
  key_name  = aws_key_pair.ec2_key.key_name
  tags = {
    Name = "backend-server"
  }
}

resource "aws_key_pair" "ec2_key" {
  key_name   = "budget-app-key"
  public_key = file("~/.ssh/budget-app-key.pub")
}