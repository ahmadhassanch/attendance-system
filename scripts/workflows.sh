#!/bin/bash

echo '=========================================================================='
echo '                SINGLE PATIENT WITHOUT DEVICE                             '
echo '=========================================================================='
yarn data:reset
ts-node RESOURCES/CHARMS/app-workflows/without-device-orderable/main-single-patient-without-device-workflow.ts

echo '=========================================================================='
echo '                SINGLE PATIENT MULTIPLE DEVICES                            '
echo '=========================================================================='
yarn data:reset
ts-node RESOURCES/CHARMS/app-workflows/device-workflows//main-multi-patient-multiple-devices-workflow.ts

echo '=========================================================================='
echo '                SINGLE PATIENT                                            '
echo '=========================================================================='
yarn data:reset
ts-node RESOURCES/CHARMS/app-workflows/device-workflows/main-single-patient-workflow.ts

echo '=========================================================================='
echo '                ESCALATION                                                '
echo '=========================================================================='
yarn data:reset
ts-node RESOURCES/CHARMS/app-workflows/escalation-workflow/main-escalation-workflow.ts


# yarn data:delete:selected
# ts-node prisma/seed-for-workflows.ts
# ts-node RESOURCES/CHARMS/app-workflows/device-workflows/main-single-patient-workflow.ts