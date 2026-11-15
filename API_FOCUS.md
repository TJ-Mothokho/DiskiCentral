# DiskiCentral focus scope

Source checked on 2026-11-15: https://v3.football.api-sports.io/leagues through the repository's temporary API-Football credentials.

Confirmed provider records:

| Competition | API-Football league ID | Provider status |
| --- | ---: | --- |
| Premier Soccer League | 288 | Available; 2026 season exposed |
| 1st Division | 289 | Available |
| League Cup | 508 | Available |
| Diski Challenge | 734 | Available |
| CAF Champions League | 12 | Available |
| CAF Confederation Cup | 20 | Available |

Searches for South African Women’s Super League, Hollywoodbets Super League, Nedbank Cup, and South Africa returned no provider record at the time of implementation. The UI therefore treats those as unavailable informational entries and does not invent IDs or send invalid fixture requests.
