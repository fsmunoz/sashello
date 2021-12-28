FROM httpd:2.4
COPY ./index.html ./styles.css ./main.js ./sas_logo.png ./favicon.ico /usr/local/apache2/htdocs/
