const get_all_boards = require("../APIs/get_all_boards");
var axios = require("axios");
const { changeIssueFields } = require("./changeIssueFields");
require("dotenv").config();
const fs = require('fs');


const domain = "mobiusdtaas";
const tokenForMIB = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjEyNDM4MDQsImlhdCI6MTcyMTIwNzgwNCwianRpIjoiZTMyOWJkODgtNTA3OS00NTU2LWEwYzItNjMxOWQwMWNiNGNjIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJCT0xUWk1BTk5fQk9UIiwiTU9ORVQiLCJIT0xBQ1JBQ1kiLCJhY2NvdW50IiwiVklOQ0kiXSwic3ViIjoiMzAzN2RmNmItYTRhNS00MTU2LWExMjgtZDBlN2RhMzljMDc4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiUEFTQ0FMX0lOVEVMTElHRU5DRSIsInNlc3Npb25fc3RhdGUiOiJjZDc4NWZiMy1jNzY2LTRhMTMtOWM2ZS0yZDk5YmU1MGNkMjQiLCJuYW1lIjoibW9iaXVzIG1vYml1cyIsImdpdmVuX25hbWUiOiJtb2JpdXMiLCJmYW1pbHlfbmFtZSI6Im1vYml1cyIsInByZWZlcnJlZF91c2VybmFtZSI6InBhc3N3b3JkX3RlbmFudF9tb2JpdXNAbW9iaXVzZHRhYXMuYWkiLCJlbWFpbCI6InBhc3N3b3JkX3RlbmFudF9tb2JpdXNAbW9iaXVzZHRhYXMuYWkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW1hc3RlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJCT0xUWk1BTk5fQk9UIjp7InJvbGVzIjpbIkJPTFRaTUFOTl9CT1RfVVNFUiJdfSwiUEFTQ0FMX0lOVEVMTElHRU5DRSI6eyJyb2xlcyI6WyJQQVNDQUxfSU5URUxMSUdFTkNFX1VTRVIiLCJQQVNDQUxfSU5URUxMSUdFTkNFX0FETUlOIl19LCJNT05FVCI6eyJyb2xlcyI6WyJNT05FVF9VU0VSIl19LCJIT0xBQ1JBQ1kiOnsicm9sZXMiOlsiU1VQRVJBRE1JTiIsIkhPTEFDUkFDWV9VU0VSIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sIlZJTkNJIjp7InJvbGVzIjpbIlZJTkNJX1VTRVIiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJjZDc4NWZiMy1jNzY2LTRhMTMtOWM2ZS0yZDk5YmU1MGNkMjQiLCJ0ZW5hbnRJZCI6IjMwMzdkZjZiLWE0YTUtNDE1Ni1hMTI4LWQwZTdkYTM5YzA3OCJ9.eaqPIPTS_TpejcSTV9Wj0RGdpVfq1NB_LZ2zwHG0GOFuR5a8Uw71hq2WsYwWesu2JQ1W0_2AB4SfLOqcM0KLMcqiyctlrRtRH-PwHTmUBF0Cuxa5CHzPk3UQ_VDt9lcRea7RzSLpbH6zWbJBkGeJTaFgD3QBL3nPfhsGRnLahUmiPb51JbPA7K8jxYCQyRpzJKemeZhr1tvMGaBrYsfLVbRYQ5XXeq0oZGanqFDUMEl2jt9ypQ4mq9YQrmTxHRzFOoHqaX1cDoPjW2MWi5jXzV5dRQmMEd4eMNIttf6ktBSU45rlduaCaa9CW9BK5F_Pxq-QSwvuIDPeoAP88s5g-Q"
const AllBoards = [
    {
        "board_id": 1,
        "board_name": "MOB board",
        "board_type": "scrum",
        "project_key": "MOB",
        "project_name": "Mobius",
        "projectId": 10000
    },
    {
        "board_id": 416,
        "board_name": "THPA board",
        "board_type": "scrum",
        "project_key": "THPA",
        "project_name": "The Platform Academy ",
        "projectId": 10348
    },
    {
        "board_id": 4,
        "board_name": "PM board",
        "board_type": "scrum",
        "project_key": "PM",
        "project_name": "Product Marketing ",
        "projectId": 10001
    },
    {
        "board_id": 199,
        "board_name": "UX Work",
        "board_type": "scrum",
        "project_key": "MP",
        "project_name": "Mobius MarketPlace",
        "projectId": 10139
    },
    {
        "board_id": 419,
        "board_name": "MAC board",
        "board_type": "scrum",
        "project_key": "MAC",
        "project_name": "Mobius Agent Canvas",
        "projectId": 10350
    },
    {
        "board_id": 420,
        "board_name": "MD board",
        "board_type": "scrum",
        "project_key": "MD",
        "project_name": "Mobius Drones",
        "projectId": 10351
    },
    {
        "board_id": 421,
        "board_name": "AUR board",
        "board_type": "scrum",
        "project_key": "AUR",
        "project_name": "Autonomous Robots",
        "projectId": 10352
    },
    {
        "board_id": 82,
        "board_name": "L3AAS board",
        "board_type": "scrum",
        "project_key": "L3AAS",
        "project_name": "L3aaS",
        "projectId": 10067
    },
    {
        "board_id": 91,
        "board_name": "OCS board",
        "board_type": "scrum",
        "project_key": "OCS",
        "project_name": "OCS",
        "projectId": 10100
    },
    {
        "board_id": 150,
        "board_name": "Marketplace",
        "board_type": "scrum",
        "project_key": "MP",
        "project_name": "Mobius MarketPlace",
        "projectId": 10139
    },
    {
        "board_id": 135,
        "board_name": "PLED board",
        "board_type": "scrum",
        "project_key": "PLED",
        "project_name": "Pledge",
        "projectId": 10128
    },
    {
        "board_id": 202,
        "board_name": "COE Sprint4",
        "board_type": "scrum",
        "project_key": "TAF",
        "project_name": "COE",
        "projectId": 10059
    },
    {
        "board_id": 203,
        "board_name": "IOS board",
        "board_type": "scrum",
        "project_key": "IOS",
        "project_name": "CompanionAppIOS",
        "projectId": 10156
    },
    {
        "board_id": 140,
        "board_name": "TechWarriors Sprint 6",
        "board_type": "scrum",
        "project_key": "AT",
        "project_name": "Middleware",
        "projectId": 10066
    },
    {
        "board_id": 79,
        "board_name": "MAYA board",
        "board_type": "scrum",
        "project_key": "MAYA",
        "project_name": "MAYA",
        "projectId": 10064
    },
    {
        "board_id": 80,
        "board_name": "HM board",
        "board_type": "scrum",
        "project_key": "HM",
        "project_name": "Hybrid Middleware",
        "projectId": 10065
    },
    {
        "board_id": 90,
        "board_name": "scrum board - NAB",
        "board_type": "scrum",
        "project_key": "MOB",
        "project_name": "Mobius",
        "projectId": 10000
    },
    {
        "board_id": 61,
        "board_name": "Sprint 2",
        "board_type": "scrum",
        "project_key": "MOB",
        "project_name": "Mobius",
        "projectId": 10000
    },
    {
        "board_id": 78,
        "board_name": "GP board",
        "board_type": "scrum",
        "project_key": "GP",
        "project_name": "Ground Plex",
        "projectId": 10063
    },
    {
        "board_id": 102,
        "board_name": "PILT board",
        "board_type": "scrum",
        "project_key": "PILT",
        "project_name": "PilotTest",
        "projectId": 10105
    },
    {
        "board_id": 71,
        "board_name": "Testing Team Board",
        "board_type": "scrum",
        "project_key": null,
        "project_name": null,
        "projectId": null
    },
    {
        "board_id": 107,
        "board_name": "test pilot",
        "board_type": "scrum",
        "project_key": "PIL",
        "project_name": "Pilot",
        "projectId": 10104
    },
    {
        "board_id": 123,
        "board_name": "Pilot srum test",
        "board_type": "scrum",
        "project_key": "PIL",
        "project_name": "Pilot",
        "projectId": 10104
    },
    {
        "board_id": 138,
        "board_name": "UMP board",
        "board_type": "scrum",
        "project_key": "UMP",
        "project_name": "Unified Mobius Portal",
        "projectId": 10130
    },
    {
        "board_id": 141,
        "board_name": "MAV",
        "board_type": "scrum",
        "project_key": "MAV",
        "project_name": "Maverick",
        "projectId": 10115
    },
    {
        "board_id": 298,
        "board_name": "TED board",
        "board_type": "scrum",
        "project_key": "TED",
        "project_name": "TEDaaS XPX",
        "projectId": 10270
    },
    {
        "board_id": 194,
        "board_name": "COE",
        "board_type": "scrum",
        "project_key": "TAF",
        "project_name": "COE",
        "projectId": 10059
    },
    {
        "board_id": 187,
        "board_name": "MP-Sprint-3",
        "board_type": "scrum",
        "project_key": "MP",
        "project_name": "Mobius MarketPlace",
        "projectId": 10139
    },
    {
        "board_id": 169,
        "board_name": "Platform Ops",
        "board_type": "scrum",
        "project_key": "CP",
        "project_name": "Backend Engg",
        "projectId": 10053
    },
    {
        "board_id": 185,
        "board_name": "DS board",
        "board_type": "scrum",
        "project_key": "DS",
        "project_name": "Designer",
        "projectId": 10149
    },
    {
        "board_id": 195,
        "board_name": "MP Sprint-4",
        "board_type": "scrum",
        "project_key": "MP",
        "project_name": "Mobius MarketPlace",
        "projectId": 10139
    },
    {
        "board_id": 186,
        "board_name": "Backend Services Sprint Board",
        "board_type": "scrum",
        "project_key": "CP",
        "project_name": "Backend Engg",
        "projectId": 10053
    },
    {
        "board_id": 191,
        "board_name": "MP-Sprint-4",
        "board_type": "scrum",
        "project_key": "MP",
        "project_name": "Mobius MarketPlace",
        "projectId": 10139
    },
    {
        "board_id": 193,
        "board_name": "CDP board",
        "board_type": "scrum",
        "project_key": "CDP",
        "project_name": "CDP Portal",
        "projectId": 10151
    },
    {
        "board_id": 196,
        "board_name": "MP",
        "board_type": "scrum",
        "project_key": "MP",
        "project_name": "Mobius MarketPlace",
        "projectId": 10139
    },
    {
        "board_id": 74,
        "board_name": "Sprint 0",
        "board_type": "scrum",
        "project_key": "AD",
        "project_name": "Old_ Adwize _ Depricated board",
        "projectId": 10003
    },
    {
        "board_id": 179,
        "board_name": "MSUDeployments",
        "board_type": "scrum",
        "project_key": "AT",
        "project_name": "Middleware",
        "projectId": 10066
    },
    {
        "board_id": 81,
        "board_name": "AT board",
        "board_type": "scrum",
        "project_key": "AT",
        "project_name": "Middleware",
        "projectId": 10066
    },
    {
        "board_id": 133,
        "board_name": "SHAPE-SCRUM",
        "board_type": "scrum",
        "project_key": "SHAP",
        "project_name": "Shapeshifters",
        "projectId": 10125
    },
    {
        "board_id": 117,
        "board_name": "VIS board",
        "board_type": "scrum",
        "project_key": "VIS",
        "project_name": "Visigners",
        "projectId": 10113
    },
    {
        "board_id": 153,
        "board_name": "ATSC1 board",
        "board_type": "scrum",
        "project_key": "ATSC1",
        "project_name": "ATSC_1.0 Middleware",
        "projectId": 10142
    },
    {
        "board_id": 155,
        "board_name": "Red Team - Deep Solutions",
        "board_type": "scrum",
        "project_key": "IT",
        "project_name": "Infrastructure Team",
        "projectId": 10116
    },
    {
        "board_id": 162,
        "board_name": "Blue Team - Integrations",
        "board_type": "scrum",
        "project_key": "CP",
        "project_name": "Backend Engg",
        "projectId": 10053
    },
    {
        "board_id": 168,
        "board_name": "Olive sprint 3",
        "board_type": "scrum",
        "project_key": "MP",
        "project_name": "Mobius MarketPlace",
        "projectId": 10139
    },
    {
        "board_id": 76,
        "board_name": "Sprint Board",
        "board_type": "scrum",
        "project_key": "CP",
        "project_name": "Backend Engg",
        "projectId": 10053
    },
    {
        "board_id": 128,
        "board_name": "NCS board",
        "board_type": "scrum",
        "project_key": "NCS",
        "project_name": "Incois",
        "projectId": 10120
    },
    {
        "board_id": 97,
        "board_name": "Pitcher",
        "board_type": "scrum",
        "project_key": "CP",
        "project_name": "Backend Engg",
        "projectId": 10053
    },
    {
        "board_id": 98,
        "board_name": "CP",
        "board_type": "scrum",
        "project_key": "CP",
        "project_name": "Backend Engg",
        "projectId": 10053
    },
    {
        "board_id": 292,
        "board_name": "PIR board",
        "board_type": "scrum",
        "project_key": "PIR",
        "project_name": "Platform Common Services",
        "projectId": 10265
    },
    {
        "board_id": 124,
        "board_name": "Green Olive",
        "board_type": "scrum",
        "project_key": "AD",
        "project_name": "Old_ Adwize _ Depricated board",
        "projectId": 10003
    },
    {
        "board_id": 144,
        "board_name": "Jarvis",
        "board_type": "scrum",
        "project_key": "MOB",
        "project_name": "Mobius",
        "projectId": 10000
    },
    {
        "board_id": 83,
        "board_name": "CES Scrum Board",
        "board_type": "scrum",
        "project_key": "MOB",
        "project_name": "Mobius",
        "projectId": 10000
    },
    {
        "board_id": 115,
        "board_name": "Green Pickle",
        "board_type": "scrum",
        "project_key": "AT",
        "project_name": "Middleware",
        "projectId": 10066
    },
    {
        "board_id": 114,
        "board_name": "Android TV/App",
        "board_type": "scrum",
        "project_key": "ANDROID",
        "project_name": "NextGen TV/App",
        "projectId": 10110
    },
    {
        "board_id": 402,
        "board_name": "PCS board",
        "board_type": "scrum",
        "project_key": "PIR",
        "project_name": "Platform Common Services",
        "projectId": 10265
    },
    {
        "board_id": 257,
        "board_name": "Design Sprint 2",
        "board_type": "scrum",
        "project_key": "DS",
        "project_name": "Designer",
        "projectId": 10149
    },
    {
        "board_id": 244,
        "board_name": "SUP board",
        "board_type": "scrum",
        "project_key": "SUP",
        "project_name": "Super Dashboard ",
        "projectId": 10205
    },
    {
        "board_id": 405,
        "board_name": "RNDH board",
        "board_type": "scrum",
        "project_key": "RNDH",
        "project_name": "RUNDheer",
        "projectId": 10337
    },
    {
        "board_id": 252,
        "board_name": "FE board",
        "board_type": "scrum",
        "project_key": "FE",
        "project_name": "FROND END ",
        "projectId": 10212
    },
    {
        "board_id": 253,
        "board_name": "DAT board",
        "board_type": "scrum",
        "project_key": "DAT",
        "project_name": "DATASCIENCE ",
        "projectId": 10213
    },
    {
        "board_id": 258,
        "board_name": "MU board",
        "board_type": "scrum",
        "project_key": "MU",
        "project_name": "Mobius UX",
        "projectId": 10219
    },
    {
        "board_id": 259,
        "board_name": "Monet Scrum Board",
        "board_type": "scrum",
        "project_key": "MPE",
        "project_name": "Mobius Platform Engineering",
        "projectId": 10216
    },
    {
        "board_id": 404,
        "board_name": "LRM board",
        "board_type": "scrum",
        "project_key": "LRM",
        "project_name": "Longley Rice Map",
        "projectId": 10335
    },
    {
        "board_id": 407,
        "board_name": "IC board",
        "board_type": "scrum",
        "project_key": "IC",
        "project_name": "Implementations Commons",
        "projectId": 10339
    },
    {
        "board_id": 408,
        "board_name": "Mobius Marketplace Agents",
        "board_type": "scrum",
        "project_key": "MHCY",
        "project_name": "Holacracy",
        "projectId": 10227
    },
    {
        "board_id": 282,
        "board_name": "MIE board",
        "board_type": "scrum",
        "project_key": "IMPL",
        "project_name": "Mobius Engineering Implementation",
        "projectId": 10249
    },
    {
        "board_id": 276,
        "board_name": "PCPF board",
        "board_type": "scrum",
        "project_key": "PCPF",
        "project_name": "PI Common Platform ",
        "projectId": 10242
    },
    {
        "board_id": 307,
        "board_name": "Around",
        "board_type": "scrum",
        "project_key": "RND",
        "project_name": "Around",
        "projectId": 10279
    },
    {
        "board_id": 255,
        "board_name": "MPE Scrum Board",
        "board_type": "scrum",
        "project_key": "MPE",
        "project_name": "Mobius Platform Engineering",
        "projectId": 10216
    },
    {
        "board_id": 261,
        "board_name": "MBOB board",
        "board_type": "scrum",
        "project_key": "MBOB",
        "project_name": "BoB",
        "projectId": 10225
    },
    {
        "board_id": 262,
        "board_name": "MMONET board",
        "board_type": "scrum",
        "project_key": "MMONET",
        "project_name": "Monet",
        "projectId": 10226
    },
    {
        "board_id": 263,
        "board_name": "MHCY board",
        "board_type": "scrum",
        "project_key": "MHCY",
        "project_name": "Holacracy",
        "projectId": 10227
    },
    {
        "board_id": 264,
        "board_name": "MVINCI board",
        "board_type": "scrum",
        "project_key": "MVINCI",
        "project_name": "Vinci",
        "projectId": 10228
    },
    {
        "board_id": 266,
        "board_name": "MSRE board",
        "board_type": "scrum",
        "project_key": "MSRE",
        "project_name": "SRE",
        "projectId": 10229
    },
    {
        "board_id": 422,
        "board_name": "MF board",
        "board_type": "scrum",
        "project_key": "MF",
        "project_name": "Manifester",
        "projectId": 10353
    },
    {
        "board_id": 304,
        "board_name": "AEGIS board",
        "board_type": "scrum",
        "project_key": "AEGIS",
        "project_name": "Aegis",
        "projectId": 10276
    },
    {
        "board_id": 272,
        "board_name": "M3IN1 board",
        "board_type": "scrum",
        "project_key": "M3IN1",
        "project_name": "3 IN 1",
        "projectId": 10238
    },
    {
        "board_id": 280,
        "board_name": "BU board",
        "board_type": "scrum",
        "project_key": "BU",
        "project_name": "BoB UI",
        "projectId": 10247
    },
    {
        "board_id": 275,
        "board_name": "MSUHAAAS board",
        "board_type": "scrum",
        "project_key": "MSUHAAAS",
        "project_name": "Mobius SUHAaaS",
        "projectId": 10241
    },
    {
        "board_id": 265,
        "board_name": "Kathy's view ",
        "board_type": "scrum",
        "project_key": "MBOB",
        "project_name": "BoB",
        "projectId": 10225
    },
    {
        "board_id": 268,
        "board_name": "VB board",
        "board_type": "scrum",
        "project_key": "VB",
        "project_name": "VINCI BOB",
        "projectId": 10234
    },
    {
        "board_id": 269,
        "board_name": "MON2 board",
        "board_type": "scrum",
        "project_key": "MON2",
        "project_name": "MONET 2.0",
        "projectId": 10235
    },
    {
        "board_id": 305,
        "board_name": "GOF board",
        "board_type": "scrum",
        "project_key": "GOF",
        "project_name": "GoFEMA",
        "projectId": 10277
    },
    {
        "board_id": 306,
        "board_name": "HH board",
        "board_type": "scrum",
        "project_key": "HH",
        "project_name": "Hear, Here!",
        "projectId": 10278
    },
    {
        "board_id": 308,
        "board_name": "MUS board",
        "board_type": "scrum",
        "project_key": "MUS",
        "project_name": "Museo",
        "projectId": 10280
    },
    {
        "board_id": 260,
        "board_name": "MPI board",
        "board_type": "scrum",
        "project_key": "MPI",
        "project_name": "Pascal Intelligence",
        "projectId": 10224
    },
    {
        "board_id": 271,
        "board_name": "PQA board",
        "board_type": "scrum",
        "project_key": "MPQA",
        "project_name": "Mobius Platform QA",
        "projectId": 10237
    },
    {
        "board_id": 309,
        "board_name": "MPRSS board",
        "board_type": "scrum",
        "project_key": "MPRSS",
        "project_name": "ImpressIO",
        "projectId": 10281
    },
    {
        "board_id": 300,
        "board_name": "MOA board",
        "board_type": "scrum",
        "project_key": "MOA",
        "project_name": "Mo Android App",
        "projectId": 10272
    },
    {
        "board_id": 302,
        "board_name": "IZAK board",
        "board_type": "scrum",
        "project_key": "IZAK",
        "project_name": "iZAK",
        "projectId": 10274
    },
    {
        "board_id": 303,
        "board_name": "AM board",
        "board_type": "scrum",
        "project_key": "AM",
        "project_name": "AmplyFund",
        "projectId": 10275
    },
    {
        "board_id": 310,
        "board_name": "CL board",
        "board_type": "scrum",
        "project_key": "CL",
        "project_name": "C-Link",
        "projectId": 10282
    },
    {
        "board_id": 311,
        "board_name": "VOT board",
        "board_type": "scrum",
        "project_key": "VOT",
        "project_name": "VoteIQ",
        "projectId": 10283
    },
    {
        "board_id": 312,
        "board_name": "REVE board",
        "board_type": "scrum",
        "project_key": "REV",
        "project_name": "Revee",
        "projectId": 10284
    },
    {
        "board_id": 313,
        "board_name": "MO board",
        "board_type": "scrum",
        "project_key": "MO",
        "project_name": "MO",
        "projectId": 10285
    },
    {
        "board_id": 283,
        "board_name": "CIO board",
        "board_type": "scrum",
        "project_key": "EDO",
        "project_name": "EDOaaS",
        "projectId": 10250
    },
    {
        "board_id": 372,
        "board_name": "MORR board",
        "board_type": "scrum",
        "project_key": "MORR",
        "project_name": "Mobius on RunRun",
        "projectId": 10307
    },
    {
        "board_id": 385,
        "board_name": "Mobius Website",
        "board_type": "scrum",
        "project_key": "AIDTAAS",
        "project_name": "Mobius Website",
        "projectId": 10321
    },
    {
        "board_id": 386,
        "board_name": "GS board",
        "board_type": "scrum",
        "project_key": "GS",
        "project_name": "Gaian Solutions Website",
        "projectId": 10322
    },
    {
        "board_id": 423,
        "board_name": "AGRI board",
        "board_type": "scrum",
        "project_key": "AGRI",
        "project_name": "Agri Tech",
        "projectId": 10354
    },
    {
        "board_id": 424,
        "board_name": "CHAIN board",
        "board_type": "scrum",
        "project_key": "CHAIN",
        "project_name": "ChainaaS",
        "projectId": 10355
    },
    {
        "board_id": 425,
        "board_name": "MIB board",
        "board_type": "scrum",
        "project_key": "MIB",
        "project_name": "Mobius Intelliboard",
        "projectId": 10356
    },
    {
        "board_id": 426,
        "board_name": "DITA board",
        "board_type": "scrum",
        "project_key": "DITA",
        "project_name": "Darwin Information Typing Architecture",
        "projectId": 10357
    },
    {
        "board_id": 427,
        "board_name": "DITA",
        "board_type": "scrum",
        "project_key": "DITA",
        "project_name": "Darwin Information Typing Architecture",
        "projectId": 10357
    },
    {
        "board_id": 430,
        "board_name": "TTS- SST-LLM",
        "board_type": "scrum",
        "project_key": "AUR",
        "project_name": "Autonomous Robots",
        "projectId": 10352
    },
    {
        "board_id": 342,
        "board_name": "MX board",
        "board_type": "scrum",
        "project_key": "MX",
        "project_name": "Marco XPX",
        "projectId": 10291
    },
    {
        "board_id": 343,
        "board_name": "VX board",
        "board_type": "scrum",
        "project_key": "VX",
        "project_name": "Voxa XPX",
        "projectId": 10292
    },
    {
        "board_id": 345,
        "board_name": "AX board",
        "board_type": "scrum",
        "project_key": "AX",
        "project_name": "AdWize XPX",
        "projectId": 10294
    },
    {
        "board_id": 347,
        "board_name": "SMS board",
        "board_type": "scrum",
        "project_key": "SMS",
        "project_name": "SMS: Subscriber management system XPX",
        "projectId": 10296
    },
    {
        "board_id": 348,
        "board_name": "CMSX board",
        "board_type": "scrum",
        "project_key": "CMS",
        "project_name": "Content management system XPX",
        "projectId": 10297
    },
    {
        "board_id": 349,
        "board_name": "CD board",
        "board_type": "scrum",
        "project_key": "CD",
        "project_name": "CX Delight XPX",
        "projectId": 10298
    },
    {
        "board_id": 352,
        "board_name": "MOBIUS board",
        "board_type": "scrum",
        "project_key": "MOBIUS",
        "project_name": "Mobius GPT 1.0",
        "projectId": 10299
    },
    {
        "board_id": 353,
        "board_name": "XSD board",
        "board_type": "scrum",
        "project_key": "XSD",
        "project_name": "Super Dashboard XPX",
        "projectId": 10300
    },
    {
        "board_id": 366,
        "board_name": "MPI Board_React",
        "board_type": "scrum",
        "project_key": "MPI",
        "project_name": "Pascal Intelligence",
        "projectId": 10224
    },
    {
        "board_id": 367,
        "board_name": "MHCY board_React",
        "board_type": "scrum",
        "project_key": "MHCY",
        "project_name": "Holacracy",
        "projectId": 10227
    },
    {
        "board_id": 368,
        "board_name": "EGCP board",
        "board_type": "scrum",
        "project_key": "EGCP",
        "project_name": "Enterprise grade _ Common Platform _ Contract",
        "projectId": 10303
    },
    {
        "board_id": 369,
        "board_name": "MS board",
        "board_type": "scrum",
        "project_key": "MS",
        "project_name": "Moscribe XPX ",
        "projectId": 10305
    },
    {
        "board_id": 370,
        "board_name": "ITIL/ITSM",
        "board_type": "scrum",
        "project_key": "ITIL",
        "project_name": "ITIL/ISM XPX",
        "projectId": 10293
    },
    {
        "board_id": 376,
        "board_name": "PV board",
        "board_type": "scrum",
        "project_key": "PV",
        "project_name": "Performance V1",
        "projectId": 10311
    },
    {
        "board_id": 379,
        "board_name": "HCM board",
        "board_type": "scrum",
        "project_key": "HCM",
        "project_name": "Horizontal Components MIAs",
        "projectId": 10314
    },
    {
        "board_id": 380,
        "board_name": "STAB board",
        "board_type": "scrum",
        "project_key": "STAB",
        "project_name": "Stability",
        "projectId": 10316
    },
    {
        "board_id": 381,
        "board_name": "DM board",
        "board_type": "scrum",
        "project_key": "DM",
        "project_name": "DevOps Master",
        "projectId": 10317
    },
    {
        "board_id": 382,
        "board_name": "PRA board",
        "board_type": "scrum",
        "project_key": "PRA",
        "project_name": "Product Research & Analysis",
        "projectId": 10318
    },
    {
        "board_id": 383,
        "board_name": "VDM board",
        "board_type": "scrum",
        "project_key": "VDM",
        "project_name": "Visual Design & Marketing",
        "projectId": 10319
    },
    {
        "board_id": 384,
        "board_name": "NXC board",
        "board_type": "scrum",
        "project_key": "NXC",
        "project_name": "Nexus Connect Website",
        "projectId": 10320
    },
    {
        "board_id": 387,
        "board_name": "QGP board",
        "board_type": "scrum",
        "project_key": "QGP",
        "project_name": "Quality Gate | Performance",
        "projectId": 10323
    },
    {
        "board_id": 388,
        "board_name": "MEB board",
        "board_type": "scrum",
        "project_key": "MEB",
        "project_name": "Mobius Engineering Blockers",
        "projectId": 10324
    },
    {
        "board_id": 389,
        "board_name": "BCB board",
        "board_type": "scrum",
        "project_key": "BCB",
        "project_name": "Platform Backend Common Board",
        "projectId": 10325
    },
    {
        "board_id": 398,
        "board_name": "TI",
        "board_type": "scrum",
        "project_key": null,
        "project_name": null,
        "projectId": null
    }
]

const ingestDataInPi = async () => {
    const sprints = []
    const data = [
        {
            "id": 1546,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1546",
            "state": "active",
            "name": "AUR Sprint 6",
            "startDate": "2024-09-24T08:00:00.000Z",
            "endDate": "2024-09-30T07:30:00.000Z",
            "createdDate": "2024-09-24T04:36:12.735Z",
            "originBoardId": 421,
            "goal": ""
        },
        {
            "id": 409,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/409",
            "state": "active",
            "name": "MSUDeployments12",
            "startDate": "2021-12-01T04:36:31.463Z",
            "endDate": "2021-12-08T04:36:00.000Z",
            "originBoardId": 179,
            "goal": ""
        },
        {
            "id": 435,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/435",
            "state": "active",
            "name": "MSUDeployments13",
            "startDate": "2022-03-28T14:42:00.000Z",
            "endDate": "2022-04-01T14:42:00.000Z",
            "createdDate": "2022-03-26T14:42:15.335Z",
            "originBoardId": 179,
            "goal": ""
        },
        {
            "id": 603,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/603",
            "state": "active",
            "name": "Mobius Sprint 41",
            "startDate": "2023-02-20T05:59:43.852Z",
            "endDate": "2023-02-24T15:59:00.000Z",
            "createdDate": "2023-02-21T05:59:03.855Z",
            "originBoardId": 114,
            "goal": ""
        },
        {
            "id": 653,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/653",
            "state": "active",
            "name": "SUP Sprint 2",
            "startDate": "2023-06-26T05:39:00.000Z",
            "endDate": "2023-07-07T05:39:00.000Z",
            "createdDate": "2023-06-09T05:37:58.922Z",
            "originBoardId": 244,
            "goal": ""
        },
        {
            "id": 1547,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1547",
            "state": "active",
            "name": "HCY Sprint 28",
            "startDate": "2024-09-26T05:38:23.285Z",
            "endDate": "2024-10-03T05:38:14.000Z",
            "createdDate": "2024-09-26T05:05:13.525Z",
            "originBoardId": 263,
            "goal": ""
        },
        {
            "id": 1545,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1545",
            "state": "active",
            "name": "Around Design & IMPL Sprint 11",
            "startDate": "2024-09-23T11:30:09.122Z",
            "endDate": "2024-09-30T11:30:00.000Z",
            "createdDate": "2024-09-23T16:41:21.990Z",
            "originBoardId": 307,
            "goal": ""
        },
        {
            "id": 1480,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1480",
            "state": "active",
            "name": "MF Sprint 2",
            "startDate": "2024-08-26T11:00:06.010Z",
            "endDate": "2024-09-02T11:00:00.000Z",
            "createdDate": "2024-08-27T17:49:11.918Z",
            "originBoardId": 422,
            "goal": ""
        },
        {
            "id": 1486,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1486",
            "state": "active",
            "name": "GoFEMA Design & IMPL Sprint 9",
            "startDate": "2024-08-28T11:30:00.000Z",
            "endDate": "2024-09-02T11:30:00.000Z",
            "createdDate": "2024-08-28T10:46:31.850Z",
            "originBoardId": 305,
            "goal": ""
        },
        {
            "id": 1502,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1502",
            "state": "active",
            "name": "MUS Design & IMPL Sprint 4",
            "startDate": "2024-09-02T11:30:00.000Z",
            "endDate": "2024-09-09T11:30:00.000Z",
            "createdDate": "2024-09-02T09:10:35.824Z",
            "originBoardId": 308,
            "goal": ""
        },
        {
            "id": 1407,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1407",
            "state": "active",
            "name": "PI Sprint 27",
            "startDate": "2024-08-21T07:30:00.000Z",
            "endDate": "2024-08-28T07:30:00.000Z",
            "createdDate": "2024-08-13T12:14:38.033Z",
            "originBoardId": 260,
            "goal": ""
        },
        {
            "id": 1483,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1483",
            "state": "active",
            "name": "PI Sprint 28",
            "startDate": "2024-08-28T11:00:51.499Z",
            "endDate": "2024-09-04T11:00:00.000Z",
            "createdDate": "2024-08-28T09:10:31.445Z",
            "originBoardId": 260,
            "goal": ""
        },
        {
            "id": 1542,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1542",
            "state": "active",
            "name": "IMPSIO Design & IMPL Sprint 14",
            "startDate": "2024-09-22T23:30:16.431Z",
            "endDate": "2024-09-29T23:30:00.000Z",
            "createdDate": "2024-09-23T04:33:44.150Z",
            "originBoardId": 309,
            "goal": ""
        },
        {
            "id": 1544,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1544",
            "state": "active",
            "name": "iZAK Design & IMPL Sprint 12",
            "startDate": "2024-09-23T11:30:41.052Z",
            "endDate": "2024-09-30T11:30:00.000Z",
            "createdDate": "2024-09-23T13:10:24.460Z",
            "originBoardId": 302,
            "goal": ""
        },
        {
            "id": 1482,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1482",
            "state": "active",
            "name": "MO Design & IMPL Sprint 7",
            "startDate": "2024-08-28T11:00:00.000Z",
            "endDate": "2024-08-30T11:00:00.000Z",
            "createdDate": "2024-08-28T07:02:19.651Z",
            "originBoardId": 313,
            "goal": ""
        },
        {
            "id": 1539,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1539",
            "state": "active",
            "name": "CIO Sprint 1",
            "startDate": "2024-09-16T07:00:58.000Z",
            "endDate": "2024-09-27T16:30:00.000Z",
            "createdDate": "2024-09-17T06:54:01.146Z",
            "originBoardId": 283,
            "goal": ""
        },
        {
            "id": 1434,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1434",
            "state": "active",
            "name": "MORR Sprint 8",
            "startDate": "2024-08-20T11:36:25.656Z",
            "endDate": "2024-08-30T08:46:00.000Z",
            "createdDate": "2024-08-20T11:35:25.001Z",
            "originBoardId": 372,
            "goal": ""
        },
        {
            "id": 1515,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1515",
            "state": "active",
            "name": "AIDTAAS Sprint 5",
            "startDate": "2024-09-09T04:30:22.624Z",
            "endDate": "2024-09-16T04:30:00.000Z",
            "createdDate": "2024-09-07T11:40:41.815Z",
            "originBoardId": 385,
            "goal": ""
        },
        {
            "id": 1543,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1543",
            "state": "active",
            "name": "ChainaaS Sprint 6",
            "startDate": "2024-09-23T11:30:58.872Z",
            "endDate": "2024-09-30T11:00:00.000Z",
            "createdDate": "2024-09-23T05:05:59.313Z",
            "originBoardId": 424,
            "goal": ""
        },
        {
            "id": 1541,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1541",
            "state": "active",
            "name": "MIB Sprint 5",
            "startDate": "2024-09-23T06:30:00.000Z",
            "endDate": "2024-09-27T15:30:00.000Z",
            "createdDate": "2024-09-23T04:29:35.812Z",
            "originBoardId": 425,
            "goal": ""
        },
        {
            "id": 1484,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1484",
            "state": "active",
            "name": "Adwize Design & IMPL Sprint 4",
            "startDate": "2024-08-29T11:00:00.000Z",
            "endDate": "2024-09-02T11:00:00.000Z",
            "createdDate": "2024-08-28T10:37:10.718Z",
            "originBoardId": 345,
            "goal": ""
        },
        {
            "id": 1540,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1540",
            "state": "active",
            "name": "DITA Sprint 2",
            "startDate": "2024-09-23T08:00:00.000Z",
            "endDate": "2024-09-30T08:00:00.000Z",
            "createdDate": "2024-09-19T02:32:37.604Z",
            "originBoardId": 348,
            "goal": ""
        },
        {
            "id": 1437,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1437",
            "state": "active",
            "name": "CXD Design & IMPL Sprint 5",
            "startDate": "2024-08-26T11:00:59.185Z",
            "endDate": "2024-09-02T11:00:00.000Z",
            "createdDate": "2024-08-20T12:27:15.338Z",
            "originBoardId": 349,
            "goal": ""
        },
        {
            "id": 1478,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1478",
            "state": "active",
            "name": "ITIL/ISM Design& IMPL Sprint 7",
            "startDate": "2024-08-26T07:00:00.000Z",
            "endDate": "2024-09-02T07:00:00.000Z",
            "createdDate": "2024-08-27T13:11:31.909Z",
            "originBoardId": 370,
            "goal": ""
        },
        {
            "id": 1525,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1525",
            "state": "active",
            "name": "TI Sprint 19",
            "startDate": "2024-09-10T05:41:22.091Z",
            "endDate": "2024-09-19T21:00:00.000Z",
            "createdDate": "2024-09-10T05:18:17.086Z",
            "originBoardId": 398,
            "goal": "Utility token complete unit testing and solidity code validation."
        },
        {
            "id": 1537,
            "self": "https://mobiusdtaas.atlassian.net/rest/agile/1.0/sprint/1537",
            "state": "active",
            "name": "TI Sprint 20",
            "startDate": "2024-09-24T05:05:30.000Z",
            "endDate": "2024-09-29T21:00:00.000Z",
            "createdDate": "2024-09-16T10:06:35.164Z",
            "originBoardId": 398,
            "goal": "DAO integration and UI development."
        }
    ]

    function chunkArray(arr, chunkSize) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    }
    // try {
    //     for (const board of AllBoards) {
    //         try {
    //             const response = await axios.get(
    //                 `https://${domain}.atlassian.net/rest/agile/1.0/board/${board?.board_id}/sprint?state=active`,
    //                 {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         "Authorization": `Basic a2FtYXRoLmFAbW9iaXVzZHRhYXMuYWk6QVRBVFQzeEZmR0YwY3hhcGlodWMxc1NtWDVYTTdOa05vb0l4eDJDaWJ5MnFwbS1yTDNpT2JUTklCUURVakFMVWRUZjhpQ2hBQTYzdE5aeXFUSnBxSDNKSnJ6YXlIOWI2UEtvYktlajdLOUE5dDZaaExtcG9DSXE0ZUxXLXRKVlRDU3lkZTd5Q2JxOVFxQVF6NkdqdnNnRTNRZklwTHVXa28wcHRTX2dZVk1sb1VoY3dfam4zbXRBPTlDOEQ4NkU1` // Use Basic Auth with the encoded token
    //                     },
    //                 }
    //             );
    //             const activeSprints = response.data.values
    //             if (activeSprints.length > 0) {
    //                 for (const sprint of activeSprints) {
    //                     console.log("sprint Id", sprint.id)
    //                     const sprintIssues = await axios.get(`https://${domain}.atlassian.net/rest/agile/1.0/sprint/${sprint.id}/issue?maxResults=200&expand=changelog`,
    //                         {
    //                             headers: {
    //                                 "Content-Type": "application/json",
    //                                 "Authorization": `Basic a2FtYXRoLmFAbW9iaXVzZHRhYXMuYWk6QVRBVFQzeEZmR0YwY3hhcGlodWMxc1NtWDVYTTdOa05vb0l4eDJDaWJ5MnFwbS1yTDNpT2JUTklCUURVakFMVWRUZjhpQ2hBQTYzdE5aeXFUSnBxSDNKSnJ6YXlIOWI2UEtvYktlajdLOUE5dDZaaExtcG9DSXE0ZUxXLXRKVlRDU3lkZTd5Q2JxOVFxQVF6NkdqdnNnRTNRZklwTHVXa28wcHRTX2dZVk1sb1VoY3dfam4zbXRBPTlDOEQ4NkU1` // Use Basic Auth with the encoded token
    //                             },
    //                         }
    //                     )
    //                     const issues = sprintIssues.data?.issues
    //                     const issueChunks = chunkArray(issues, 10);
    //                     for (const issueChunk of issueChunks) {
    //                         const issuesWithUpdatedFields = await changeIssueFields(issueChunk)
    //                         try {
    //                             const ingestData = await axios.post(
    //                                 `https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas/66f54ed3f604240f96404684/instances?upsert=true`,
    //                                 issuesWithUpdatedFields, // Data to be sent as the body of the request
    //                                 {
    //                                     headers: {
    //                                         "Content-Type": "application/json",
    //                                         authorization: `Bearer ${tokenForMIB}`
    //                                     }
    //                                 }
    //                             );
    //                             console.log(ingestData.data)
    //                         } catch (error) {
    //                             console.log(error)
    //                         }
    //                     }

    //                     // console.log(sprintIssues.data, `sprint id ${sprint.id}`)
    //                 }
    //             }
    //             console.log(sprints)

    //         } catch (sprintError) {
    //             console.error(`Error fetching sprints for board ${board?.board_id}:`, sprintError);
    //         }
    //     }
    //     const uniqueSprints = [...new Map(sprints.map(item => [item.id, item])).values()];
    //     const jsonData = JSON.stringify(uniqueSprints, null, 2); // Pretty print with 2 spaces

    //     // Write the JSON data to a file
    //     fs.writeFileSync('data.json', jsonData);
    //     console.log('Data successfully saved to data.json');
    // } catch (error) {
    //     console.error("Error fetching boards:", error);
    // }

    for (const sprint of data) {
        try {
            const sprintIssues = await axios.get(`https://${domain}.atlassian.net/rest/agile/1.0/sprint/${sprint?.id}/issue?maxResults=200&expand=changelog`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic a2FtYXRoLmFAbW9iaXVzZHRhYXMuYWk6QVRBVFQzeEZmR0YwY3hhcGlodWMxc1NtWDVYTTdOa05vb0l4eDJDaWJ5MnFwbS1yTDNpT2JUTklCUURVakFMVWRUZjhpQ2hBQTYzdE5aeXFUSnBxSDNKSnJ6YXlIOWI2UEtvYktlajdLOUE5dDZaaExtcG9DSXE0ZUxXLXRKVlRDU3lkZTd5Q2JxOVFxQVF6NkdqdnNnRTNRZklwTHVXa28wcHRTX2dZVk1sb1VoY3dfam4zbXRBPTlDOEQ4NkU1` // Use Basic Auth with the encoded token
                    },
                }
            )
            console.log(sprint?.id)
            const issues = sprintIssues.data?.issues
            const issueChunks = chunkArray(issues, 10);
            for (const issueChunk of issueChunks) {
                const issuesWithUpdatedFields = await changeIssueFields(issueChunk)
                try {
                    const ingestData = await axios.post(
                        `https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas/66f54ed3f604240f96404684/instances?upsert=true`,
                        issuesWithUpdatedFields, // Data to be sent as the body of the request
                        {
                            headers: {
                                "Content-Type": "application/json",
                                authorization: `Bearer ${tokenForMIB}`
                            }
                        }
                    );
                    console.log(ingestData.data)
                } catch (error) {
                    console.log(error)
                }
            }

        } catch (error) {
            console.log(error.message)
        }
    }
   
}

// To run the function
ingestDataInPi();
