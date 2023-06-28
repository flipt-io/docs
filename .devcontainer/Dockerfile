FROM debian:latest

RUN apt-get update && apt-get install -y \
    curl \
    git \
    gnupg \
    lsb-release \
    wget

# install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash