import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';

export const DecoyScreen = ({ onExit, panicKey }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#ffffff] text-[#202122] overflow-y-auto font-sans selection:bg-[#a7d7f9]">
      {/* Top Wikipedia-style Bar */}
      <header className="border-b border-[#a2a9b1] px-6 py-3 flex items-center justify-between text-sm bg-[#f8f9fa]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl text-[#000000]">WIKIPEDIA</span>
            <span className="text-xs text-[#54595d]">The Free Encyclopedia</span>
          </div>
          <div className="hidden md:flex items-center text-xs text-[#3366cc] gap-3">
            <span>Main page</span>
            <span>·</span>
            <span>Contents</span>
            <span>·</span>
            <span>Current events</span>
            <span>·</span>
            <span>Random article</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#72777d]" />
            <input
              type="text"
              readOnly
              value="Cellular respiration"
              className="pl-8 pr-3 py-1 text-xs border border-[#a2a9b1] rounded bg-white w-48 text-[#202122] outline-none"
            />
          </div>

          <button
            onClick={onExit}
            title={`Press [${panicKey.toUpperCase()}] or click to return`}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#eaecf0] hover:bg-[#d5d9df] text-xs font-medium text-[#202122] border border-[#a2a9b1] rounded transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to App [{panicKey.toUpperCase()}]</span>
          </button>
        </div>
      </header>

      {/* Main Wikipedia Article Body */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-serif font-normal border-b border-[#a2a9b1] pb-2 mb-4 text-[#000000]">
          Cellular respiration
        </h1>

        <div className="text-xs text-[#54595d] mb-6">
          From Wikipedia, the free encyclopedia · Peer-reviewed biology curriculum document
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4 text-[15px] leading-relaxed text-[#202122]">
            <p>
              <strong>Cellular respiration</strong> is the set of metabolic reactions and processes that take place in the cells of organisms to convert biochemical energy from nutrients into adenosine triphosphate (ATP), and then release waste products.
            </p>
            <p>
              The catabolic reactions involved in respiration include glycolysis, the citric acid cycle (Krebs cycle), and oxidative phosphorylation via the electron transport chain. Nutrients commonly utilized in animal and plant cells include amino acids, fatty acids, and the monosaccharide glucose.
            </p>

            <h2 className="text-xl font-serif border-b border-[#c8ccd1] pt-4 pb-1 font-normal text-[#000000]">
              1. Glycolysis Pathway
            </h2>
            <p>
              Glycolysis is a metabolic pathway that converts glucose (C6H12O6) into pyruvate (CH3COCOO-) and a hydrogen ion (H+). The free energy released in this reaction is used to form high-energy compounds (ATP and NADH). Glycolysis is an ancient metabolic pathway that does not require molecular oxygen.
            </p>
            <div className="bg-[#f8f9fa] border-l-2 border-[#72777d] p-3 text-xs font-mono text-[#54595d]">
              Glucose + 2 NAD+ + 2 ADP + 2 Pi ➔ 2 Pyruvate + 2 NADH + 2 H+ + 2 ATP + 2 H2O
            </div>

            <h2 className="text-xl font-serif border-b border-[#c8ccd1] pt-4 pb-1 font-normal text-[#000000]">
              2. Oxidative Phosphorylation & ATP Synthase
            </h2>
            <p>
              In eukaryotic cells, oxidative phosphorylation occurs across the inner mitochondrial membrane. Electrons transferred through complex I, III, and IV pump protons into the intermembrane space, generating an electrochemical proton gradient that drives ATP synthase rotary kinetics.
            </p>
          </div>

          {/* Right Info Box */}
          <div className="border border-[#a2a9b1] bg-[#f8f9fa] p-4 text-xs space-y-3 rounded self-start">
            <div className="font-bold text-center border-b border-[#c8ccd1] pb-2 text-[#000000]">
              Aerobic Respiration
            </div>
            <div className="space-y-1.5 text-[#54595d]">
              <div><strong className="text-[#202122]">Net Yield:</strong> 30–32 ATP per glucose</div>
              <div><strong className="text-[#202122]">Location:</strong> Cytosol & Mitochondria</div>
              <div><strong className="text-[#202122]">Primary Enzyme:</strong> ATP Synthase</div>
              <div><strong className="text-[#202122]">Waste Products:</strong> Carbon dioxide, water</div>
            </div>
            <div className="pt-2 border-t border-[#c8ccd1] text-[11px] text-[#72777d]">
              Diagram 4.2 · Standard secondary and collegiate biology educational reference material.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
