# To update LetsEncrypt certificates:

Install plugin

```
pip install letsencrypt
pip install letsencrypt-s3front
```

Update with command:

```
sudo AWS_ACCESS_KEY_ID="..." AWS_SECRET_ACCESS_KEY="..." letsencrypt --agree-tos -a letsencrypt-s3front:auth --letsencrypt-s3front:auth-s3-bucket app.rcrd.org -i letsencrypt-s3front:installer --letsencrypt-s3front:installer-cf-distribution-id E1VPQ5MZUZT625 -d app.rcrd.org
```
