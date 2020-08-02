FROM node:12

COPY --chown=node:node . .

ARG BUILDNUMBER

ENV BUILDNUMBER $BUILDNUMBER

CMD ["/bin/sh", "/startup.sh"]