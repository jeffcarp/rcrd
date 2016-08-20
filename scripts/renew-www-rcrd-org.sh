AWS_ACCESS_KEY_ID="" \
AWS_SECRET_ACCESS_KEY="" \
letsencrypt --agree-tos -a letsencrypt-s3front:auth \
--letsencrypt-s3front:auth-s3-bucket www.rcrd.org \
--letsencrypt-s3front:auth-s3-region us-east-1 \
-i letsencrypt-s3front:installer \
--letsencrypt-s3front:installer-cf-distribution-id E3T2A24VJYJOZM \
-d www.rcrd.org
