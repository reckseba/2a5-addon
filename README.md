# 2a5-addon
2a5 Browser Bar Extension

## Development

- Open Firefox
- Goto: about:debugging#/runtime/this-firefox
- Load Temporary Add-on...
- Select manifest.json
- Click Inspect button and open tab network to see XHR requests in action

## Prepare Publishing
```bash
sudo npm install --global web-ext
cd app
```

This is how web-ext works: https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/


## Publish: go the manual upload way
```bash
web-ext build
```
Upload the packed zip file from web-ext-artifacts:
- Login to mozilla and goto https://addons.mozilla.org/de/developers/addon/2a5-de-url-shortener-addon/versions/submit/

Wait until it gets accepted.

Then goto https://addons.mozilla.org/de/developers/addon/2a5-de-url-shortener-addon/versions/5549013 and download the XPI file

Put the XPI file to `releases` folder and calculate checksum `sha256sum 2a5_de_url_shortener_addon-1.2.0.xpi`.


## Publish: go the cli way

Go and get a key here https://addons.mozilla.org/de/developers/addon/api/key/

Grab the UUID from addons page https://addons.mozilla.org/de/developers/addon/2a5-de-url-shortener-addon/edit

Then run:
```bash
web-ext sign --channel=listed --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET --id="{UUID}"
```

Yeah... this is not working...

