#!/usr/bin/env sh
set -e

#######################################
# Test AWS Authentication.
# Globals:
#   None
# Arguments:
#   None
#######################################
function test_authentication() {
  if ! aws sts get-caller-identity; then
    echo "ERROR: Authentication failure." >&2
    exit 1
  fi
  true;
}


echo "PRE: Clearn-up..."
rm -f results.json runtime.json urls.json message.json error.json

# Run tests 
npm run $ENVIRONMENT
echo "dev_dbHost=$dev_dbHost"

echo "PRE: AWS Authentication Test..."
test_authentication

echo "START: Running tests..."
jo environment="${ENVIRONMENT}" test_suite="${TEST_SUITE}" datetime="$(date '+%d-%m-%Y %H:%M:%S')" > runtime.json

FAILURES=$(cat cypress/reports/mochareports/report.json| jq '.stats.failures')
PASSES=$(cat cypress/reports/mochareports/report.json| jq '.stats.passes')
TOTAL=$(cat cypress/reports/mochareports/report.json| jq '.stats.tests')

jo tests=$TOTAL failed=$FAILURES passed=$PASSES > results.json;
jq -s add results.json runtime.json > test_report.json


HASH=$(find /usr/src/app/cypress/ -type f -print0 | sort -z | xargs -0 sha1sum | sha1sum | cut -b -40)

#HASH=$(find /Users/rajab/projects/Hitachi/frontend-test-automation/cypress -type f -print0 | sort -z | xargs -0 sha1sum | sha1sum | cut -b -40)

if [[ -z "${HASH}" ]]; then
  echo "ERROR: Failed to Compute SHA1 Hash." >&2
  # HASH=2883d37f730c81667f481e6021b071e02033de81
  exit 1
fi

CYPRESS_URL="http://${WEBSITE_HOSTNAME}/$HASH/fe-cypress-reports/reports/mochareports/report.html"
jo cypress_url="${CYPRESS_URL}" > urls.json
jq -s add results.json runtime.json urls.json > test_report.json

echo "CYPRESS_URL=$CYPRESS_URL"

echo "SYNC: Syncing Reports to s3://${REPORT_BUCKET}/${HASH}/"
declare -a locations=("reports" "screenshots")

for i in "${locations[@]}"; do
  if [ -d "/usr/src/app/cypress/${i}" ]; then
    if ! aws s3 sync "/usr/src/app/cypress/${i}/" "s3://${REPORT_BUCKET}/${HASH}/fe-cypress-reports/${i}/" --acl "public-read"; then
    # if ! aws s3 sync "/Users/rajab/projects/Hitachi/frontend-test-automation/cypress/${i}/" "s3://${REPORT_BUCKET}/${HASH}/fe-cypress-reports/${i}/" --acl "public-read"; then
      echo "Unable to Sync ${i} to S3" >&2
      exit 1
    fi
  fi
done

aws sns publish --topic-arn "${SNS_TOPIC}" --message "file://test_report.json" --region "${AWS_REGION}";

echo "INFO: Results Published & Subscribers Notified"
echo "'Cypress' Report Avaible at :"
echo "${CYPRESS_URL}"
