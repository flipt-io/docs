FROM debian:latest

RUN apt-get update && apt-get install -y \
    curl \
    git \
    gnupg \
    lsb-release \
    wget

ENV NEXT_TELEMETRY_DISABLED=1

# install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# install vale
RUN wget https://github.com/errata-ai/vale/releases/download/v2.15.4/vale_2.15.4_Linux_64-bit.tar.gz && \
    mkdir -p bin && tar -xvzf vale_2.15.4_Linux_64-bit.tar.gz -C bin && \
    export PATH=./bin:"$PATH"
