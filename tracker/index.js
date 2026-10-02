import activeWin from 'active-win';
import os from 'os';
import { exec } from 'child_process';

let lastApp = null;
let lastTitle = null;
let wasIdle = false;

console.log('👀 Awarely Tracker started — monitoring apps and user activity...');

async function getIdleSeconds() {
  return new Promise((resolve) => {
    const platform = os.platform();

    if (platform === 'win32') {
      exec(
        'powershell "$idle = [System.Windows.Forms.SystemInformation]::IdleTime; Write-Output $idle"',
        (err, stdout) => {
          if (err || !stdout) return resolve(0);
          const idleMs = parseInt(stdout.trim());
          resolve(Math.floor(idleMs / 1000));
        }
      );
    } else if (platform === 'darwin') {
      exec(
        'ioreg -c IOHIDSystem | awk \'/HIDIdleTime/ {print int($NF/1000000000); exit}\'',
        (err, stdout) => {
          if (err || !stdout) return resolve(0);
          resolve(parseInt(stdout.trim()) || 0);
        }
      );
    } else {
      exec('xprintidle', (err, stdout) => {
        if (err || !stdout) return resolve(0);
        resolve(parseInt(stdout.trim()) / 1000 || 0);
      });
    }
  });
}

function cleanTitle(title = '') {
  return title
    .replace(/\s+-\s+Brave$/, '')
    .replace(/\s+-\s+Google Chrome$/, '')
    .trim();
}

setInterval(async () => {
  const idleSecs = await getIdleSeconds();
  const isIdle = idleSecs > 60; // idle if > 1 min

  if (isIdle && !wasIdle) {
    console.log(`🟡 User went idle (${idleSecs}s)`);
  } else if (!isIdle && wasIdle) {
    console.log(`🟢 User active again`);
  }

  wasIdle = isIdle;
  if (isIdle) return;

  const info = await activeWin();
  if (!info) return;

  const app = info.owner.name;
  const title = cleanTitle(info.title);

  if (app !== lastApp || title !== lastTitle) {
    if (!title && app === 'Application Frame Host') return;
    console.log(`🟩 Active App: ${app}\n   Window: ${title}`);
    lastApp = app;
    lastTitle = title;
  }
}, 3000);
