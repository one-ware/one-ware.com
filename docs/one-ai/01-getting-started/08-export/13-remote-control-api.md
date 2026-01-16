---
id: remotecontrol-api
title: RemoteControlService API Dokumentation
sidebar_label: RemoteControlService API
---

# RemoteControlService API Documentation

## Overview

The RemoteControlService provides an HTTP-based API for remotely controlling and triggering AI validation checks in the OneWare.AI application. The service runs an HTTP listener that accepts POST requests and returns JSON responses. It can be activated by opening the Camera Tool and setting the checkmark in the top right. This page contains the information necessary to connect to the HTTP listener in OneWare Studio.

## Service Configuration

- **Protocol**: HTTP
- **Method**: POST only
- **Content-Type**: `application/json`
- **Response Format**: JSON

## Base URL

The base URL is configurable when the service is instantiated. Default format:
```
http://localhost:<port>/
```

## Endpoints

### POST /check

Triggers an AI validation check by capturing photos from configured cameras and running validation rules.

#### Endpoint Details
- **URL**: `/check`
- **Method**: POST
- **Auth required**: No
- **Handler Name**: "AI check"

#### Request Format

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{}
```

The request body is an empty JSON object. No parameters are required.

**Example Request:**
```bash
curl -X POST http://localhost:8080/check \
  -H "Content-Type: application/json" \
  -d '{}'
```

#### Response Format

**Success Response (200 OK):**

```json
{
  "isValid": true,
  "validationRules": [
    {
      "ruleType": "AreaValidation",
      "parameters": {
        "type": "area",
        "appliesTo": "All",
        "name": "Area Check",
        "appliesToCamera": null,
        "appliesToPreset": null,
        "executeCheckPerCapture": false
      },
      "isValid": true,
      "value": 0.85
    },
    {
      "ruleType": "CountValidation",
      "parameters": {
        "type": "count",
        "appliesTo": "Camera",
        "name": "Count Check",
        "appliesToCamera": "Camera1",
        "appliesToPreset": null,
        "executeCheckPerCapture": true
      },
      "isValid": false,
      "value": 3.0
    }
  ],
  "captures": [
    {
      "name": "Camera1_Preset1",
      "isValid": true
    },
    {
      "name": "Camera2_Preset1",
      "isValid": false
    }
  ]
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `isValid` | `boolean` | Overall validation result. `true` if all validation rules passed, `false` otherwise. |
| `validationRules` | `array` | Array of validation rule results. |
| `captures` | `array` | Array of capture results from each camera/preset combination. |

**ValidationRule Object:**

| Field | Type | Description |
|-------|------|-------------|
| `ruleType` | `string` | Type of validation rule (e.g., "AreaValidation", "CountValidation", "MinDistanceValidation"). |
| `parameters` | `object` | Rule-specific configuration parameters (see Rule Parameters section). |
| `isValid` | `boolean` | Whether this specific rule passed validation. |
| `value` | `number` | The computed value from the validation rule. |

**Capture Object:**

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Name/identifier of the capture (typically Camera_Preset format). |
| `isValid` | `boolean` | Whether this specific capture passed its validation checks. |

#### Rule Parameters

The `parameters` object structure depends on the rule type, identified by the `type` discriminator field:

**Common Fields (all types):**

| Field | Type | Description |
|-------|------|-------------|
| `type` | `string` | Rule type discriminator: `"area"`, `"count"`, `"minDistance"`, `"areaWeighted"`, or `"countWeighted"`. |
| `appliesTo` | `string` | Scope of the rule: `"All"`, `"Camera"`, or `"Preset"`. |
| `name` | `string` or `null` | Optional name for the rule. |
| `appliesToCamera` | `string` or `null` | Camera name if `appliesTo` is `"Camera"`. |
| `appliesToPreset` | `string` or `null` | Preset name if `appliesTo` is `"Preset"`. |
| `executeCheckPerCapture` | `boolean` | Whether to execute the check individually per capture or across all captures. |

**Rule Types:**

1. **Area Validation** (`type: "area"`)
   - Validates based on detected object area/size

2. **Count Validation** (`type: "count"`)
   - Validates based on the number of detected objects

3. **Min Distance Validation** (`type: "minDistance"`)
   - Validates minimum distance between detected objects

4. **Weighted Area Validation** (`type: "areaWeighted"`)
   - Validates area with weighted calculation

5. **Weighted Count Validation** (`type: "countWeighted"`)
   - Validates count with weighted calculation

#### Behavior

When this endpoint is called:
1. The service triggers the camera capture command
2. Photos are taken from all configured cameras
3. AI models process the captured images
4. Validation rules are evaluated against the AI results
5. Results are aggregated and returned as JSON

#### Error Responses

**Endpoint Not Available (200 OK):**
```
Endpoint not available
```
Returned when:
- Wrong HTTP method used (not POST)
- Invalid endpoint path
- Endpoint not found in handlers

**Bad Request (200 OK):**
```
Bad request
```
Returned when the request payload cannot be parsed as valid JSON.

**Internal Error (200 OK):**
```
Internal error
```
Returned when an unexpected error occurs during request processing.

> **Note**: All error responses currently return HTTP 200 status code with plain text body (not JSON).

## Usage Example - Python

```python
import requests
import json

# Trigger AI check
response = requests.post('http://localhost:8080/check', json={})

if response.status_code == 200:
    try:
        result = response.json()
        print(f"Validation passed: {result['isValid']}")
        print(f"Number of rules checked: {len(result['validationRules'])}")
        print(f"Number of captures: {len(result['captures'])}")
        
        # Check individual rules
        for rule in result['validationRules']:
            print(f"Rule {rule['ruleType']}: {'PASS' if rule['isValid'] else 'FAIL'} (value: {rule['value']})")
    except json.JSONDecodeError:
        print(f"Error: {response.text}")
else:
    print(f"HTTP Error: {response.status_code}")
```

## Disclaimer

The RemoteControlService is an experimental feature intendet for prototyping only. If you enable it in OneWare Studio you do so at your own risk. Only enable in closed network environments decoupled from the web.
