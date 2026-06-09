/**
 * Grasshopper Website Main JS
 * Handles:
 * 1. Responsive Navbar & Mobile Menu
 * 2. Sticky Navbar & Scroll Progress
 * 3. Fade-in on Scroll Animations (Intersection Observer)
 * 4. Section Jump Animations (Leaping grasshoppers on scroll)
 * 5. Interactive Terminal timeline and Typing Simulator
 * 6. Back to Top behavior
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initTerminalTimeline();
  initBackToTop();
  initSectionJumpTrigger();
});

/* =========================================================================
   1. NAVBAR & MOBILE MENU
   ========================================================================= */
function initNavbar() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-item a');

  // Toggle mobile menu
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      
      // Transform hamburger into 'X'
      const spans = menuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        menuToggle.click();
      }
    });
  });

  // Sticky Navbar class toggler
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
}

/* =========================================================================
   2. FADE-IN ON SCROLL (INTERSECTION OBSERVER)
   ========================================================================= */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));
}

/* =========================================================================
   3. SECTION JUMP ANIMATIONS (LEAPING GRASSHOPPERS)
   ========================================================================= */
function initSectionJumpTrigger() {
  const sections = document.querySelectorAll('section, header, footer');
  let currentActiveSectionId = null;

  const observerOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: '-10% 0px -40% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        // Update nav active state
        updateNavActiveState(sectionId);

        // If we transitioned to a new section, trigger a grasshopper leap!
        if (currentActiveSectionId && currentActiveSectionId !== sectionId) {
          const fromSelector = `#${currentActiveSectionId} .section-title, #${currentActiveSectionId} .hero-title`;
          const toSelector = `#${sectionId} .section-title, #${sectionId} .hero-title`;
          
          // Trigger jump only if logo is not current section or target is not current logo
          if (document.querySelector(fromSelector) && document.querySelector(toSelector)) {
            // Trigger jump after a tiny delay
            setTimeout(() => {
              if (window.triggerJump) {
                window.triggerJump(fromSelector, toSelector);
              }
            }, 100);
          }
        }
        currentActiveSectionId = sectionId;
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

function updateNavActiveState(activeId) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('a');
    if (link && link.getAttribute('href') === `#${activeId}`) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

/* =========================================================================
   4. INTERACTIVE TERMINAL TIMELINE & TYPING SIMULATOR
   ========================================================================= */
const stepLogs = {
  1: [
    { type: 'prompt', text: 'guest@cyber-lab:~$ wget -O grasshopper.7z "https://drive.google.com/file/d/1ADAvjq7FqWUux3D0Rn2khVlWzg-ulFpe/view"' },
    { type: 'output', text: '--2026-06-09 15:20:00--  https://drive.google.com/file/d/1ADAvjq7FqWUux3D0Rn2khVlWzg-ulFpe/view<br>Resolving drive.google.com... 142.250.181.238<br>Connecting to drive.google.com|142.250.181.238|:443... connected.<br>HTTP request sent, awaiting response... 200 OK<br>Length: 1.42 GB [application/x-7z-compressed]' },
    { type: 'output', text: 'Saving to: ‘grasshopper.7z’<br><br>[======================================>] 1.42GB   45.2MB/s   in 32s<br><br>2026-06-09 15:20:32 (45.2 MB/s) - ‘grasshopper.7z’ saved [1524715520/1524715520]' },
    { type: 'output', text: '<div class="screenshot-box"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Downloaded Successfully. File check: MD5 8b56f87d4982a7a40b938bf78b201cd9</div>' }
  ],
  2: [
    { type: 'prompt', text: 'guest@cyber-lab:~$ 7z x grasshopper.7z' },
    { type: 'output', text: '7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21<br><br>Scanning the drive for archives:<br>1 file, 1524715520 bytes (1.42 GB)<br><br>Extracting archive: grasshopper.7z<br>--<br>Path = grasshopper.7z<br>Type = 7z<br>Method = LZMA2<br>Solid = -<br>Blocks = 1<br><br>Everything is Ok<br><br>Size:       2.65 GB<br>Compressed: 1.42 GB<br><br>Files extracted:<br> - grasshopper.ova (VMware/VirtualBox Virtual Appliance)' },
    { type: 'output', text: '<div class="screenshot-box"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>Archive extracted. You can now use VirtualBox or VMware to import.</div>' }
  ],
  3: [
    { type: 'prompt', text: 'guest@cyber-lab:~$ vboxmanage import grasshopper.ova' },
    { type: 'output', text: '0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%<br>Successfully imported the virtual machine appliance.<br>Suggested System Specs:<br> - OS Type: Ubuntu (64-bit)<br> - RAM: 1024 MB<br> - VRAM: 16 MB<br> - NIC: Host-Only or NAT' },
    { type: 'output', text: '<div class="screenshot-box"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><circle cx="12" cy="12" r="2"></circle></svg>VM Imported. Make sure Network Mode is set to Bridged or Host-Only.</div>' }
  ],
  4: [
    { type: 'prompt', text: 'guest@cyber-lab:~$ nmap -sV -p- grasshopper.local' },
    { type: 'output', text: 'Starting Nmap 7.80 ( https://nmap.org ) at 2026-06-09 15:21:45 UTC<br>Nmap scan report for grasshopper.local (192.168.56.102)<br>Host is up (0.00035s latency).<br>Not shown: 65529 closed ports<br>PORT     STATE SERVICE VERSION<br>21/tcp   open  ftp     vsftpd 3.0.3<br>22/tcp   open  ssh     OpenSSH 7.6p1<br>23/tcp   open  telnet  Linux telnetd<br>80/tcp   open  http    Apache httpd 2.4.29<br>3306/tcp open  mysql   MySQL 5.7.33<br><br>Service detection performed. Please begin exploiting vulnerabilities.' },
    { type: 'output', text: 'guest@cyber-lab:~$ echo "HAPPY HACKING!"' },
    { type: 'output', text: '<span style="color:#39ff14; font-weight:bold; font-size:1.1rem; text-shadow:0 0 10px #39ff14;">HAPPY HACKING! START YOUR ENUMERATION!</span>' }
  ]
};

let currentTypingTimer = null;

function initTerminalTimeline() {
  const steps = document.querySelectorAll('.timeline-step');
  const terminalContent = document.getElementById('terminal-docs-body');

  if (!terminalContent) return;

  // Render Step 1 by default on load
  runTerminalTyping(1);

  steps.forEach(step => {
    step.addEventListener('click', () => {
      // Remove active from all steps
      steps.forEach(s => s.classList.remove('active'));
      // Add active to current
      step.classList.add('active');

      const stepNum = parseInt(step.getAttribute('data-step'));
      runTerminalTyping(stepNum);
    });
  });
}

function runTerminalTyping(stepNum) {
  const terminalContent = document.getElementById('terminal-docs-body');
  if (!terminalContent) return;

  // Clear previous timers and content
  if (currentTypingTimer) {
    clearInterval(currentTypingTimer);
  }
  terminalContent.innerHTML = '';

  const logs = stepLogs[stepNum];
  let logIndex = 0;

  function processNextLog() {
    if (logIndex >= logs.length) {
      // Done writing, add flashing cursor
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      terminalContent.appendChild(cursor);
      // Auto scroll to bottom
      terminalContent.scrollTop = terminalContent.scrollHeight;
      return;
    }

    const log = logs[logIndex];
    
    if (log.type === 'prompt') {
      const line = document.createElement('div');
      line.className = 'terminal-prompt';
      terminalContent.appendChild(line);

      // Typewriter effect for prompt
      let charIndex = 0;
      currentTypingTimer = setInterval(() => {
        if (charIndex >= log.text.length) {
          clearInterval(currentTypingTimer);
          logIndex++;
          // Add a newline space
          terminalContent.appendChild(document.createElement('br'));
          processNextLog();
        } else {
          line.innerHTML += log.text.charAt(charIndex);
          charIndex++;
          terminalContent.scrollTop = terminalContent.scrollHeight;
        }
      }, 20); // Typing speed
    } else {
      // For output logs, print instantly or in simulated chunks
      const line = document.createElement('div');
      line.className = 'terminal-output';
      line.innerHTML = log.text;
      terminalContent.appendChild(line);
      terminalContent.scrollTop = terminalContent.scrollHeight;
      
      // Delay before printing next output
      logIndex++;
      setTimeout(processNextLog, 450);
    }
  }

  processNextLog();
}

/* =========================================================================
   5. BACK TO TOP BUTTON
   ========================================================================= */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
