# [Choice] Debian OS version: bullseye, buster
ARG VARIANT=bullseye
FROM --platform=linux/amd64 mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# Install Deno
ENV DENO_INSTALL=/usr/local/bin/deno
ENV DENO_VERSION=1.23.0

RUN mkdir -p ${DENO_INSTALL} \
    && curl -fsSL https://deno.land/x/install/install.sh \
       |  sh -s v${DENO_VERSION} \
    && chown -R vscode ${DENO_INSTALL}

ENV PATH=${DENO_INSTALL}/bin:${PATH} \
    DENO_DIR=${DENO_INSTALL}/.cache/deno

# Install flyctl for fly.io
ENV FLYCTL_INSTALL=/usr/local/bin/fly 

RUN curl -L https://fly.io/install.sh | sh \
    && chown -R vscode ${FLYCTL_INSTALL}

ENV PATH=${FLYCTL_INSTALL}/bin:${PATH}

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#    && apt-get -y install --no-install-recommends <your-package-list-here>
