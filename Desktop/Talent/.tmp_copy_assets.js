const fs = require('node:fs');
const path = require('node:path');

const sourceRoot = 'C:\\Users\\vunna\\.cursor\\projects\\c-Users-vunna-Desktop-Talent\\assets';
const publicRoot = 'C:\\Users\\vunna\\Desktop\\Talent\\public';

const copies = [
  // Client logos
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Amara-36fef4df-9269-4c6c-a57a-0245e14d8118.png', 'client-logos/amara.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Aven-79722f3b-783e-44d3-afa5-7ca80c3bc345.png', 'client-logos/avenue.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_ARIA-49803a36-9998-4d4f-bef1-862c86fcd669.png', 'client-logos/aria.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Aurobindo_Pharma-3d2477af-52bd-4597-8b40-92dde4e9008b.png', 'client-logos/aurobindo-pharma.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Circle-3a759608-a082-4ae1-9b95-8f9f322e8c54.png', 'client-logos/circle.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Deloitte-d1762502-af2d-4c22-8b74-dd40b2ebbb2b.png', 'client-logos/deloitte.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Divi_s_Laboratories-ab2afa4c-9792-425a-bd4b-ac13d6871f32.png', 'client-logos/divis-laboratories.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Dr._Reddy_s_Laboratories-916fa789-978a-4338-825b-7725ead22359.png', 'client-logos/dr-reddys-laboratories.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Eventify-e218e0c7-3a9e-434d-a663-7a198a77a391.png', 'client-logos/eventify.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Expert-22f053d2-614a-4d85-8d6e-a6e29a87844f.png', 'client-logos/expert.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_HSBC-acaa1c8c-bfaf-45cf-9855-072a67e03d06.png', 'client-logos/hsbc.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Infosys-9e134b21-f3e5-4f1a-9962-d455b17626cf.png', 'client-logos/infosys.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_JPMorgan_Chase-1abc92ef-2679-4323-ab83-cf4d08f5f762.png', 'client-logos/jpmorgan-chase.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Petal-65f21085-5458-4ba6-8661-669bf334fc45.png', 'client-logos/petal.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Petral_Capital-de032c40-9e0f-450b-ae36-ff44329de834.png', 'client-logos/petral-capital.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Polaris-59d1dae8-4534-4b74-b4ff-0d7564c44301.png', 'client-logos/polaris.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Quest_Diagnostics-29a80e98-cf4c-4cf8-815b-a4145cdeb412.png', 'client-logos/quest-diagnostics.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Sun_Pharmaceutical_Industries-cffce8fa-ac1b-4c51-922c-fda84f4c2146.png', 'client-logos/sun-pharmaceutical-industries.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_TCS-80c68fb2-4d09-473d-ae45-3d495ab73c05.png', 'client-logos/tcs.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_tech_mahindra-ced63ca5-3ef7-4dbd-8367-8c338efebf7d.png', 'client-logos/tech-mahindra.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_UnitedHealth_Group-819de186-8431-4071-8509-2db475a734da.png', 'client-logos/unitedhealth-group.png'],

  // Service visuals
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Consulting-4da06826-4381-4650-a98a-f6563d32e5a7.png', 'service-images/consulting.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Custom_Solutions-1a261c14-6a7a-48cf-aa09-3784e6e0fcb3.png', 'service-images/custom-solutions.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Cloud_Services-1904395e-83e7-4258-9372-3c9b549984de.png', 'service-images/cloud-services.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_CRM-00e99df0-76e2-4968-aaaf-071e1b718362.png', 'service-images/crm.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Engineering-2bf6268b-01b1-400b-b8dc-49114544cb43.png', 'service-images/engineering.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Estimating_Software-9522768f-18c7-42ca-922b-9983b06c41ae.png', 'service-images/estimating-software.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Software_Development-3e8deb68-a766-4fa8-a729-6d1a8e0315c2.png', 'service-images/software-development.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Supply_Chain_Management-c051c392-6233-4f3e-a548-8ebff48b8c37.png', 'service-images/supply-chain-management.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Testing-58e51595-b57b-4a80-b9a7-fb5ecdf14a40.png', 'service-images/testing.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Data_Analytics-aa395926-ecb6-431f-9dbf-def85c14386c.png', 'service-images/data-analytics.png'],

  // Map preview
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Maps-b26b6758-72da-4a56-a50f-df63cf613d95.png', 'map-images/office-map.png'],

  // Technology icons
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_java-1e775eae-c70d-4517-a005-ad032f02ceac.png', 'tech-icons/java.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_sql-69a0f8e7-4eb8-40ca-bcda-8b1c84868882.png', 'tech-icons/sql.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_postgre-00b40e09-4e13-4e0d-9b32-20f2821194fd.png', 'tech-icons/postgresql.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_database-storage-79fbe9cd-9c0b-4d9c-a9cc-b29323ed7480.png', 'tech-icons/database-storage.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Power_BI-30fd2862-2321-4785-a30b-ebffb9c175f3.png', 'tech-icons/power-bi.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Docker-77a54e6b-e2cb-4a34-b508-b6d53692ab59.png', 'tech-icons/docker.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Kubernetes-ce4d1a2b-0e1c-4087-bf28-df0b8e91e261.png', 'tech-icons/kubernetes.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_GitHub_Actions-060f6660-706a-4490-bcde-564d6eab2588.png', 'tech-icons/github-actions.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Jenkins-5d0fb059-702b-45a5-abe8-59a40a78a513.png', 'tech-icons/jenkins.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Playwright-b53ed70e-e542-4afb-a011-0bfecddff508.png', 'tech-icons/playwright.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Cypress-2834667c-1612-4170-8e11-45ecb34db447.png', 'tech-icons/cypress.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Selenium-d7632a50-5314-4c22-af54-da4f700d4ae4.png', 'tech-icons/selenium.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Terraform-d8c74d1e-8923-4ad5-a840-27a52aa79914.png', 'tech-icons/terraform.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_JAWS-d49c843c-f68c-48ed-88d0-d05d73c3a5bc.png', 'tech-icons/jaws.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_WCAG-db64eb86-744b-4cec-8979-e55ff754f785.png', 'tech-icons/wcag.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_NVDA-0a841d72-7504-4ffe-9628-ea015617fca5.png', 'tech-icons/nvda.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Manual_verification-a0312bb8-b5e8-42d8-b7a6-613775372198.png', 'tech-icons/manual-verification.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_Automation_support-6dff5b70-4888-450c-a141-d05f8096603a.png', 'tech-icons/automation-support.png'],
  ['c__Users_vunna_AppData_Roaming_Cursor_User_workspaceStorage_9f422c670968e2af3fa53412b6a99aba_images_CI-friendly_testing-5f9d1b67-71c4-4210-bf71-705d8e1b482a.png', 'tech-icons/ci-friendly-testing.png'],
];

for (const [srcRel, dstRel] of copies) {
  const src = path.join(sourceRoot, srcRel);
  const dst = path.join(publicRoot, dstRel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  console.log(`copied ${dstRel}`);
}
