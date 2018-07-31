FROM debian

MAINTAINER Gavin Dodd gavin.dodd@trinet.com

# create a configuration directory
RUN mkdir -p /content/ui/portal
RUN mkdir -p /content/ui/portal/assets
RUN mkdir -p /content/ui/portal/app

# Add all local files to the conf volume
ADD index.html /content/ui/portal/
ADD home.html /content/ui/portal/
ADD ./assets /content/ui/portal/assets/
ADD ./app /content/ui/portal/app/

ADD ./ui /content/ui/portal/ui

# The exposed volume can be any path that suits, but keeping them all the same
# keeps things simple.
# TODO - Think about versioning of ui code
# Create the volume this container provides
VOLUME ["/content/ui/portal"]