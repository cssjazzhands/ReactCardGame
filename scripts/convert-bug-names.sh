#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <json-file>"
  exit 1
fi

FILE="$1"
TMP="${FILE}.tmp"

jq '
  map(
    if (.id? != null) then
      {id: .id} + del(.id)
    elif (.fieldName? | type) == "string" then
      {
        id: (
          .fieldName
          | ascii_downcase
          | gsub("[^a-z0-9]+"; "_")
          | gsub("^_+|_+$"; "")
        )
      } + .
    else
      .
    end
  )
' "$FILE" > "$TMP"

if [ $? -eq 0 ]; then
  mv "$TMP" "$FILE"
  echo "Successfully updated: $FILE"
else
  echo "ERROR: Failed to process $FILE"
  rm -f "$TMP"
  exit 1
fi
