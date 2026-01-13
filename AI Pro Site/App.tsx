import React, { useState } from 'react';
import { NavBar, HomePage, AuditsPage, EvasionPage, ProgressPage, SourcesPage, GetStartedPage } from './components/StaticSite';
import { Workspace } from './components/Workspace';
import { TaxDocument } from './types';

// Mock Data simulating the "Audits" and "Tax Info" from the GitHub branch
const REPO_DOCUMENTS: TaxDocument[] = [
  {
    id: 'repo-gao-ai',
    name: 'GAO: AI Helping IRS Close Tax Gap (2024)',
    type: 'other',
    source: 'repo',
    uploadDate: new Date('2024-06-06'),
    isActive: true,
    content: `SOURCE: U.S. Government Accountability Office (GAO) Blog - Artificial Intelligence May Help IRS Close the Tax Gap.
    
    KEY FACTS:
    - The IRS estimates the gross "tax gap" (tax owed but not paid on time) for Tax Year 2022 is $696 Billion.
    - After late payments and enforcement, the net tax gap is projected at $606 Billion.
    - The tax gap has been a problem for decades and is growing.
    
    HOW AI HELPS:
    1. Annual Audits: AI models help select a representative sample of returns to audit and identify returns more likely to have errors or owe additional taxes.
    2. Refundable Credits: IRS uses AI to select taxpayers claiming credits (like EITC) for audit. New models are proving more effective at finding risky taxpayers.
    3. Partnership Audits: Large partnerships increased by 600% between 2002 and 2019. IRS uses AI models to prioritize these complex returns for audit, focusing on high-risk selection.
    
    GAO RECOMMENDATIONS:
    The IRS should do more to document these AI models to ensure transparency and consistency. Without this, the IRS risks being unable to explain how it selected taxpayers for burdensome audits.`
  },
  {
    id: 'repo-crim-tax-manual',
    name: 'DOJ Criminal Tax Manual: Evasion & Willfulness',
    type: 'tax_code',
    source: 'repo',
    uploadDate: new Date('2015-07-01'),
    isActive: true,
    content: `SOURCE: Criminal Tax Manual - 8.00 Attempt to Evade or Defeat Tax (26 U.S.C. § 7201)

    STATUTORY LANGUAGE:
    Any person who willfully attempts in any manner to evade or defeat any tax imposed by this title... shall be guilty of a felony.
    
    ELEMENTS OF EVASION:
    1. An affirmative act constituting an attempt to evade or defeat a tax.
    2. An additional tax due and owing.
    3. Willfulness.
    
    AFFIRMATIVE ACTS (Spies Evasion):
    Merely failing to file a return or pay tax is not evasion (it is a misdemeanor under § 7203). Evasion requires an affirmative act (commission) such as:
    - Keeping a double set of books.
    - Making false entries or alterations.
    - Destruction of books or records.
    - Concealment of assets or covering up sources of income.
    - Handling of one's affairs to avoid making records.
    - Filing a false W-4.
    
    WILLFULNESS:
    Defined as a "voluntary, intentional violation of a known legal duty" (Cheek v. United States).
    - Good motive is not a defense.
    - Willful blindness (deliberate ignorance) can substitute for positive knowledge.
    
    METHODS OF PROOF:
    - Specific Items Method: Direct evidence of income received (e.g., third party testimony).
    - Net Worth Method: Measures increases in wealth vs reported income.
    - Bank Deposits Method: Reconstruction of income via bank analysis.
    - Cash Method: Comparison of cash expenditures vs cash sources.`
  },
  {
    id: 'repo-tax-crimes-handbook',
    name: 'Tax Crimes Handbook (Chief Counsel)',
    type: 'tax_code',
    source: 'repo',
    uploadDate: new Date('2009-01-01'),
    isActive: true,
    content: `SOURCE: Office of Chief Counsel Criminal Tax Division - Tax Crimes Handbook

    I.R.C. § 7206(1) - FRAUD AND FALSE STATEMENTS
    Elements:
    1. Making and subscribing a return/document which was false as to a material matter.
    2. Containing a written declaration made under penalties of perjury.
    3. Maker did not believe the document to be true and correct.
    4. Willfulness.
    
    Note: Tax deficiency is NOT required for § 7206(1). The crime is the false statement itself.
    
    I.R.C. § 7202 - WILLFUL FAILURE TO COLLECT OR PAY OVER TAX
    Applies to "trust fund taxes" (FICA, withholding).
    Elements:
    1. Duty to collect/truthfully account for and pay over.
    2. Failure to collect or truthfully account for and pay over.
    3. Willfulness.
    
    I.R.C. § 7212 - ATTEMPTS TO INTERFERE WITH ADMINISTRATION (OMNIBUS CLAUSE)
    Prohibits corrupt endeavors to impede or obstruct the due administration of the tax laws.
    Examples:
    - Corruptly influencing a witness.
    - Filing false forms (like 1099s) to harass IRS agents or creditors.
    - Creating a complex web of corporations to disguise the character of income (Klein Conspiracy).`
  },
  {
    id: 'repo-ira-sop',
    name: 'IRS Strategic Operating Plan (IRA Update 2024)',
    type: 'policy',
    source: 'repo',
    uploadDate: new Date('2024-04-01'),
    isActive: true,
    content: `SOURCE: IRA Strategic Operating Plan | Annual Update Supplement 2024
    
    VISION FOR TRANSFORMED IRS:
    1. Taxpayer Service: "All taxpayers can meet all responsibilities... in a completely digital manner if they prefer."
    2. Enforcement: "Noncompliant taxpayers, in particular the largest and most complex filers, pay what they owe because the IRS has the workforce and advanced technology needed..."
    
    KEY ENFORCEMENT PRIORITIES:
    - High-Income/High-Wealth: Ramped up pursuit of millionaires with recognized tax debt (recovered $520M as of Jan 2024).
    - Complex Partnerships: Examinations of 76 of the largest partnerships in the U.S. (hedge funds, real estate, public partnerships).
    - Large Corporations: Expanded Large Corporate Compliance (LCC) program using data analytics.
    - Fairness: IRS will NOT increase audit rates for small businesses and households earning $400,000 or less relative to historic levels.
    
    TECHNOLOGY:
    - Direct File: Pilot launched for free direct filing.
    - Digitalization: Scanning paper returns at the point of receipt.
    - AI & Analytics: Using AI to detect tax evasion in complex structures and to identify scams.`
  },
  {
    id: 'repo-pub-3498',
    name: 'Pub 3498: The Examination Process',
    type: 'audit',
    source: 'repo',
    uploadDate: new Date('2025-05-01'),
    isActive: true,
    content: `SOURCE: IRS Publication 3498 (Rev. 5-2025)
    
    THE EXAMINATION PROCESS:
    1. Selection: Random selection, related examinations, or third-party documentation mismatch (1099/W-2).
    2. Methods:
       - By Mail: Requesting info on specific items.
       - In Person: At home, place of business, or IRS office.
    3. Representation: You can represent yourself or have an authorized representative (Form 2848).
    
    RESULTS:
    - No Change: Return accepted as filed.
    - Agreed: You sign an agreement and pay (or receive refund).
    - Unagreed: You have appeal rights.
    
    FAST TRACK SETTLEMENT:
    A process to resolve audit issues during examination using an Appeals official as a mediator. Requires the issue to be fully developed and both parties to agree.
    
    STATUTE OF LIMITATIONS (ASED):
    Generally 3 years. IRS may request a "Consent" to extend this date to complete the audit. Taxpayers can refuse, negotiate terms, or sign an unconditional consent.`
  },
  {
    id: 'repo-pub-5125',
    name: 'Pub 5125: LB&I Examination Process',
    type: 'audit',
    source: 'repo',
    uploadDate: new Date('2025-09-01'),
    isActive: true,
    content: `SOURCE: IRS Publication 5125 (Rev. 9-2025) - Large Business & International
    
    PROCESS PHASES:
    1. Planning: Determining scope, issue selection, and timeline. Opening conference.
    2. Execution: Fact development, IDRs (Information Document Requests), Notices of Proposed Adjustment (NOPA).
    3. Resolution: Reaching agreement, Fast Track Settlement, closing.
    
    IDR PROCEDURES (Information Document Requests):
    - Discuss IDR with taxpayer before issuance.
    - Create reasonable response dates.
    - Mandatory enforcement process if responses are incomplete or late (Delinquency Notice -> Pre-Summons -> Summons).
    
    CLAIMS FOR REFUND:
    - Must be brought to exam team's attention within 30 days of opening conference to be treated informally.
    - Afterward, formal claims (1120X) are required.
    - Must meet Treas. Reg 301.6402-2 standards (detail ground, facts, perjury statement).`
  }
];

type View = 'home' | 'audits' | 'evasion' | 'progress' | 'sources' | 'get-started' | 'workspace';

function App() {
  const [view, setView] = useState<View>('home');

  if (view === 'workspace') {
    return (
      <Workspace 
        initialDocuments={REPO_DOCUMENTS} 
        onBack={() => setView('get-started')} 
      />
    );
  }

  return (
    <>
      <NavBar active={view} onChange={(v) => setView(v as View)} />
      {view === 'home' && <HomePage onNavigate={(v) => setView(v as View)} />}
      {view === 'audits' && <AuditsPage />}
      {view === 'evasion' && <EvasionPage />}
      {view === 'progress' && <ProgressPage />}
      {view === 'sources' && <SourcesPage />}
      {view === 'get-started' && <GetStartedPage onLaunchWorkspace={() => setView('workspace')} />}
    </>
  );
}

export default App;
