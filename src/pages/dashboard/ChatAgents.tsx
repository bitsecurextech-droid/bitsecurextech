import { useEffect, useState } from 'react';
import { Phone, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function ChatAgents() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('admin_agents').select('*').eq('is_active', true).then(({ data }) => {
      setAgents(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4">
        <h1 className="text-2xl font-bold text-white">Chat & Agents</h1>
        <p className="text-sm text-slate-400">Select an agent to chat via WhatsApp.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
      ) : agents.length === 0 ? (
        <div className="text-center py-10 text-slate-400 border border-dashed border-white/10 rounded-xl">No agents available yet.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {agents.map((a) => (
            <div key={a.id} className="flex flex-col items-center rounded-xl bg-navy-800/50 p-6 border border-white/5 text-center">
              <div className="mb-3 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-cyber-500 to-electric-500 text-xl font-bold text-white overflow-hidden">
                {a.avatar_url ? <img src={a.avatar_url} className="h-full w-full object-cover" /> : a.name[0]}
              </div>
              <h3 className="font-semibold text-white">{a.name}</h3>
              <p className="text-sm text-slate-400">{a.role}</p>
              <a href={`https://wa.me/${a.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener" className="mt-4 w-full btn-primary flex justify-center gap-2 text-sm py-2.5">
                <Phone className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export function ChatAgents;