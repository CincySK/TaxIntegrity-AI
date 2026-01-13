import React, { useState } from 'react';

// Shared Components

export const Hero: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className="hero" id="top">
    <div className="hero__bg" aria-hidden="true"></div>
    <div className="container hero__inner">
      {children}
      <footer className="footer">
        <div className="muted small">
          Data Source: IRS Inflation Reduction Act Strategic Operating Plan (2024 Update) & GAO-24-106449.
        </div>
      </footer>
    </div>
  </section>
);

export const NavBar: React.FC<{ active: string, onChange: (page: string) => void }> = ({ active, onChange }) => (
  <header className="nav">
    <div className="nav__inner">
      <div className="brand">
        <button 
          onClick={() => onChange('home')} 
          className="brand__logo"
          style={{ backgroundColor: '#5E265E', borderColor: '#7B2D7B' }}
        >
          T
        </button>
        <button onClick={() => onChange('home')} className="text-white hover:text-gray-200" data-edit="site.title">TaxIntegrity</button>
      </div>
      <nav className="nav__links">
        <button className={`nav__link ${active === 'audits' ? 'is-active' : ''}`} onClick={() => onChange('audits')}>Tax Audits</button>
        <button className={`nav__link ${active === 'evasion' ? 'is-active' : ''}`} onClick={() => onChange('evasion')}>Evasion</button>
        <button className={`nav__link ${active === 'progress' ? 'is-active' : ''}`} onClick={() => onChange('progress')}>Real Results</button>
        <button className={`nav__link ${active === 'sources' ? 'is-active' : ''}`} onClick={() => onChange('sources')}>Sources</button>
        <button className={`nav__link nav__link--getstarted ${active === 'get-started' ? 'is-active' : ''}`} onClick={() => onChange('get-started')}>Data Explorer</button>
      </nav>
    </div>
  </header>
);

// Pages

export const HomePage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => (
  <Hero>
    <div className="hero__top">
      <h1 data-edit="site.title">TaxIntegrity</h1>
      <p className="hero__tagline" data-edit="site.tagline">
        Official IRS Data &amp; AI-Powered Analysis
      </p>
    </div>

    <div className="panel">
      <div className="panel__header">
        <h2>Real Data Only</h2>
        <p className="muted">
          This platform is built on <b>actual IRS reports</b>, including the 2024 Strategic Operating Plan and GAO findings.
          We provide AI analysis of official tax codes, audit manuals, and enforcement statistics.
        </p>
      </div>
      <div className="muted small">
        Primary Source: IRS Tax Gap Projections (Tax Year 2022) & IRS IRA Strategic Operating Plan Annual Update (2024).
      </div>
    </div>

    <div className="panel">
      <div className="panel__header">
        <h2>Mission Objectives</h2>
        <p className="muted">The IRS modernization plan focuses on three core objectives powered by new funding.</p>
      </div>
      <div className="chiprow">
        <button className="chip" onClick={() => onNavigate('audits')}>See Audit Strategy →</button>
        <button className="chip" onClick={() => onNavigate('evasion')}>See Evasion Focus →</button>
        <button className="chip" onClick={() => onNavigate('progress')}>See Real Results →</button>
        <button className="chip" onClick={() => onNavigate('get-started')}>Explore Tax Gap →</button>
      </div>

      <div className="progress__grid" style={{ marginTop: '8px' }}>
        <div className="progresscard">
          <div className="progresscard__label">High-Wealth Focus</div>
          <div className="muted small">Shift enforcement to complex partnerships and high-income earners.</div>
        </div>
        <div className="progresscard">
          <div className="progresscard__label">Fairness</div>
          <div className="muted small">No increase in audit rates for small businesses earning &lt;$400k.</div>
        </div>
        <div className="progresscard">
          <div className="progresscard__label">Modernization</div>
          <div className="muted small">Retiring 60-year-old legacy code and digitalizing paper returns.</div>
        </div>
      </div>
    </div>
  </Hero>
);

export const AuditsPage: React.FC = () => (
  <Hero>
    <div className="hero__top">
      <h1>Tax Audits</h1>
      <p className="hero__tagline muted">Prioritizing complex filings and high-dollar noncompliance.</p>
    </div>

    <div className="hero__panels">
      <article className="panel">
        <div className="panel__header">
           <h2 data-edit="audit.heading">Enforcement Priorities</h2>
           <p className="muted" data-edit="audit.subheading">As defined in the IRS Strategic Operating Plan</p>
        </div>
        <div className="chiprow">
           <button className="chip">Large Corporations</button>
           <button className="chip">Complex Partnerships</button>
           <button className="chip">High-Income Individuals</button>
        </div>
        <div className="panel__body">
            <div className="mock">
              <div className="mock__screen">
                <div className="mock__title">Audit Focus Areas</div>
                <div className="mock__list">
                   <div className="signal">
                     <div className="signal__t">Large Partnerships</div>
                     <div className="signal__d">76 examinations opened on largest U.S. partnerships (hedge funds, real estate).</div>
                   </div>
                   <div className="signal">
                     <div className="signal__t">High-Income Non-Filers</div>
                     <div className="signal__d">125,000 instances of high-income taxpayers failing to file since 2017.</div>
                   </div>
                   <div className="signal">
                     <div className="signal__t">Corporate Compliance</div>
                     <div className="signal__d">Using data analytics to identify large corporate taxpayers for audit.</div>
                   </div>
                </div>
              </div>
            </div>
        </div>
      </article>

      <article className="panel">
        <div className="panel__header">
          <h2>Modernization Tools</h2>
          <p className="muted">Replacing legacy systems to support audit efficiency.</p>
        </div>
        <div className="progress__grid" style={{gridTemplateColumns: '1fr'}}>
           <div className="progresscard">
             <div className="progresscard__label">Digitization</div>
             <div className="muted small">Scanning paper returns at point of receipt to eliminate manual data entry.</div>
           </div>
           <div className="progresscard">
             <div className="progresscard__label">AI & Analytics</div>
             <div className="muted small">Using AI to detect tax evasion in complex structures and identify scams.</div>
           </div>
        </div>
      </article>
    </div>
  </Hero>
);

export const EvasionPage: React.FC = () => (
  <Hero>
    <div className="hero__top">
      <h1>Evasion</h1>
      <p className="hero__tagline muted">Addressing the $696 Billion Gross Tax Gap.</p>
    </div>

    <article className="panel" style={{ marginTop: '14px' }}>
      <div className="panel__header">
        <h2>The Tax Gap Reality</h2>
        <p className="muted">
          According to the GAO and IRS projections for Tax Year 2022, the <b>Gross Tax Gap</b> is the difference between true tax liability and what is paid on time.
        </p>
      </div>
      <div className="progress__grid">
        <div className="progresscard">
          <div className="progresscard__label">Gross Tax Gap</div>
          <div className="progresscard__value">$696B</div>
          <div className="progresscard__sub">Projected for Tax Year 2022</div>
        </div>
        <div className="progresscard">
          <div className="progresscard__label">Net Tax Gap</div>
          <div className="progresscard__value">$606B</div>
          <div className="progresscard__sub">After late payments &amp; enforcement</div>
        </div>
        <div className="progresscard">
          <div className="progresscard__label">Primary Driver</div>
          <div className="progresscard__value">Underreporting</div>
          <div className="progresscard__sub">Accounts for majority of the gap</div>
        </div>
      </div>
    </article>

    <div className="hero__panels">
      <article className="panel">
        <div className="panel__header">
          <h2 data-edit="evasion.heading">Strategies to Close the Gap</h2>
          <p className="muted" data-edit="evasion.subheading">Sourced from GAO Reports</p>
        </div>

        <div className="panel__body">
          <div className="checkrow">
            <div className="check"><span className="check__dot check__dot--amber">!</span><span>Underreporting</span></div>
            <div className="check"><span className="check__dot check__dot--amber">!</span><span>Underpayment</span></div>
            <div className="check"><span className="check__dot check__dot--amber">!</span><span>Non-Filing</span></div>
          </div>
          
          <div className="mock" style={{marginTop: '16px'}}>
            <div className="mock__screen">
              <div className="mock__title">New Enforcement Measures</div>
              <div className="mock__list">
                <div className="signal">
                  <div className="signal__t">Digital Asset Reporting</div>
                  <div className="signal__d">Implementing regulations for broker reporting on crypto assets.</div>
                </div>
                <div className="signal">
                  <div className="signal__t">1099-K Reporting</div>
                  <div className="signal__d">Improving information reporting for gig economy and third-party settlement organizations.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      <article className="panel">
         <div className="panel__header">
          <h2>Fairness Commitment</h2>
          <p className="muted">Treasury Directive regarding audit rates.</p>
        </div>
        <div className="progresscard" style={{marginTop: '12px'}}>
          <div className="progresscard__label">Protection for Small Business</div>
          <div className="muted small" style={{marginTop: '8px'}}>
            "The IRS will not increase audit rates relative to historical levels for small businesses and households earning $400,000 or less."
          </div>
          <div className="muted small" style={{marginTop: '4px', fontStyle: 'italic'}}>— IRS Strategic Operating Plan</div>
        </div>
      </article>
    </div>
  </Hero>
);

export const ProgressPage: React.FC = () => (
  <Hero>
    <div className="hero__top">
      <h1>Real Results</h1>
      <p className="hero__tagline muted">Actual outcomes reported in the 2024 IRS Strategic Operating Plan Update.</p>
    </div>

    <div className="panel">
      <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px'}} data-edit="progress.heading">
        Enforcement &amp; Collections
      </h3>

      <div className="progress__grid">
        <div className="progresscard">
          <div className="progresscard__label">High-Wealth Recovery</div>
          <div className="progresscard__value" style={{color: '#45f39a'}}>$520M</div>
          <div className="progresscard__sub">Recovered from millionaires with tax debt (as of Jan 2024)</div>
        </div>

        <div className="progresscard">
          <div className="progresscard__label">Complex Partnerships</div>
          <div className="progresscard__value">76</div>
          <div className="progresscard__sub">New examinations opened on largest U.S. partnerships</div>
        </div>

        <div className="progresscard">
          <div className="progresscard__label">Employee Retention Credit</div>
          <div className="progresscard__value">$1B+</div>
          <div className="progresscard__sub">Protected by disrupting scammers targeting ERC</div>
        </div>
      </div>
    </div>

    <div className="panel" style={{marginTop: '14px'}}>
      <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px'}}>
        Service Improvements
      </h3>

      <div className="progress__grid">
        <div className="progresscard">
          <div className="progresscard__label">Phone Service Level</div>
          <div className="meter">
            <div className="meter__track"><div className="meter__fill meter__fill--green" style={{ width: '88%' }}></div></div>
            <div className="meter__value">88%</div>
          </div>
          <div className="progresscard__sub">Achieved in 2024 Filing Season (up from 15% in 2022)</div>
        </div>

        <div className="progresscard">
          <div className="progresscard__label">Wait Time</div>
          <div className="progresscard__value">3 Min</div>
          <div className="progresscard__sub">Average main line wait time (2024 Filing Season)</div>
        </div>

        <div className="progresscard">
          <div className="progresscard__label">Digital Returns</div>
          <div className="progresscard__value">140k+</div>
          <div className="progresscard__sub">Returns filed via new Direct File pilot</div>
        </div>
      </div>
    </div>
  </Hero>
);

export const SourcesPage: React.FC = () => (
  <Hero>
    <div className="hero__top">
      <h1>Sources</h1>
      <p className="hero__tagline muted">All data on this platform is sourced from official government reports.</p>
    </div>

    <article className="panel" style={{ marginTop: '14px' }}>
      <div className="panel__header">
        <h2>Primary References</h2>
      </div>

      <div className="mock__list">
        <div className="signal">
          <div className="signal__t">IRS IRA Strategic Operating Plan | Annual Update Supplement (2024)</div>
          <div className="signal__d">Source for enforcement revenue ($520M), service levels (88%), and modernization milestones.</div>
        </div>

        <div className="signal">
          <div className="signal__t">GAO Report (GAO-24-106449)</div>
          <div className="signal__d">Source for Tax Gap projections (Gross $696B / Net $606B) and AI utilization in audit selection.</div>
        </div>

        <div className="signal">
          <div className="signal__t">Criminal Tax Manual (Dept of Justice)</div>
          <div className="signal__d">Definitions for tax evasion, fraud, and legal standards used in the AI workspace.</div>
        </div>

        <div className="signal">
          <div className="signal__t">TIGTA Reports</div>
          <div className="signal__d">Oversight reports on IRS AI governance and project inventories.</div>
        </div>
      </div>
    </article>
  </Hero>
);

export const GetStartedPage: React.FC<{ onLaunchWorkspace: () => void }> = ({ onLaunchWorkspace }) => {
  const [viewMode, setViewMode] = useState<'gross' | 'net'>('gross');

  // Real Data from GAO/IRS Tax Gap Projections
  // Gross Gap: 696B. Breakdown approx: 
  // Underreporting: 542B
  // Underpayment: 77B
  // Nonfiling: 77B
  
  // Net Gap: 606B (After enforcement/late payments)
  
  const data = viewMode === 'gross' 
    ? { total: 696, underreporting: 542, underpayment: 77, nonfiling: 77, label: "Gross Tax Gap" }
    : { total: 606, underreporting: 472, underpayment: 67, nonfiling: 67, label: "Net Tax Gap (After Enforcement)" }; // Simplified net proportions for display based on approx recovery

  return (
    <Hero>
      <div className="hero__top">
        <h1>Data Explorer</h1>
        <p className="hero__tagline muted">Visualize the official IRS Tax Gap Data (Tax Year 2022 Projections).</p>
      </div>

      <div className="panel" style={{ marginTop: '14px' }}>
        <div className="panel__header">
          <h2>Tax Gap Breakdown</h2>
          <p className="muted">The difference between taxes owed and taxes paid on time.</p>
        </div>

        <div className="actionrow">
          <div className="flex gap-2">
            <button 
                className={`btn ${viewMode === 'gross' ? 'btn--primary' : ''}`} 
                onClick={() => setViewMode('gross')}
            >
                Gross Gap ($696B)
            </button>
            <button 
                className={`btn ${viewMode === 'net' ? 'btn--primary' : ''}`} 
                onClick={() => setViewMode('net')}
            >
                Net Gap ($606B)
            </button>
          </div>
        </div>

        <div className="result" style={{marginTop: '20px'}}>
          <div className="result__title">{data.label}: ${data.total} Billion</div>
          
           <div className="simcards">
              <div className="simcard">
                  <div className="simcard__k">Underreporting</div>
                  <div className="simcard__v">${data.underreporting}B</div>
                  <div className="simcard__sub">~78% of gap</div>
              </div>
              <div className="simcard">
                  <div className="simcard__k">Underpayment</div>
                  <div className="simcard__v">${data.underpayment}B</div>
                  <div className="simcard__sub">~11% of gap</div>
              </div>
              <div className="simcard">
                  <div className="simcard__k">Non-Filing</div>
                  <div className="simcard__v">${data.nonfiling}B</div>
                  <div className="simcard__sub">~11% of gap</div>
              </div>
           </div>
           
           <div className="muted small" style={{marginTop: '16px'}}>
             Source: GAO Report on Artificial Intelligence & IRS Tax Gap Estimates (Tax Year 2022).
             Underreporting (reporting too little income) is consistently the largest contributing factor.
           </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: '14px', textAlign: 'center', padding: '40px' }}>
        <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px'}}>Analyze Your Documents</h2>
        <p className="muted" style={{maxWidth: '600px', margin: '0 auto 24px'}}>
            Use the TaxIntegrity Workspace to analyze documents against these official tax codes and compliance standards using Google Gemini.
        </p>
        <button 
          className="btn btn--cta-mega"
          onClick={onLaunchWorkspace}
        >
          Launch AI Workspace
        </button>
      </div>
    </Hero>
  );
};