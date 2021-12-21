const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('Creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    name: "silicoin-blockchain",
    appDirectory: path.join(rootPath, 'Silicoin-win32-x64'),
    authors: 'Silicoin Network',
    version: process.env.SILICOIN_INSTALLER_VERSION,
    noMsi: true,
    iconUrl: 'https://raw.githubusercontent.com/Silicoin-Network/silicoin-blockchain/master/electron-react/src/assets/img/silicoin.ico',
    outputDirectory: path.join(outPath, 'windows-installer'),
    certificateFile: 'win_code_sign_cert.p12',
    certificatePassword: process.env.WIN_CODE_SIGN_PASS,
    exe: 'silicoin-blockchain.exe',
    setupExe: 'SilicoinSetup-' + process.env.SILICOIN_INSTALLER_VERSION + '.exe',
    setupIcon: path.join(rootPath, 'src', 'assets', 'img', 'silicoin.ico')
  })
}
