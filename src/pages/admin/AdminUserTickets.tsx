import { useEffect, useState } from 'react';
import { Ticket, Loader2, Send, CheckCircle, XCircle, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';

export function AdminUserTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [replying, setReplying] = useState<{ [key: string]: boolean }>({});

  const loadTickets = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('portal_tickets')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setTickets(data);
    setLoading(false);
  };

  useEffect(() => { loadTickets(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('portal_tickets').update({ status }).eq('id', id);
    loadTickets();
  };

  const sendReply = async (ticketId: string) => {
    if (!replyText[ticketId]?.trim() || replying[ticketId]) return;
    setReplying((prev) => ({ ...prev, [ticketId]: true }));

    // Save the reply into the database (creates a new message)
    const { error } = await supabase.from('portal_ticket_replies').insert({
      ticket_id: ticketId,
      admin_id: user?.id,
      message: replyText[ticketId].trim(),
    });

    if (!error) {
      setReplyText((prev) => ({ ...prev, [ticketId]: '' }));
      loadTickets(); // Reload to show the new reply
    }
    setReplying((prev) => ({ ...prev, [ticketId]: false }));
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold text-white">User Support Tickets</h1><p className="text-sm text-slate-400">View, reply, and manage user support requests.</p></div>
        <button onClick={loadTickets} className="btn-ghost px-4 py-2 text-xs">Refresh</button>
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center">
          <Ticket className="h-12 w-12 text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">No support tickets yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <div key={t.id} className="rounded-2xl glass p-5 border border-white/5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-white">{t.subject}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      t.status === 'Open' ? 'bg-electric-500/15 text-electric-400' :
                      t.status === 'Closed' ? 'bg-slate-500/15 text-slate-400' :
                      'bg-yellow-500/15 text-yellow-400'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    <User className="inline h-3 w-3 mr-1" /> User ID: {t.user_id?.slice(0, 8)}...
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(t.id, t.status === 'Open' ? 'Closed' : 'Open')} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${t.status === 'Open' ? 'bg-red-500/15 text-red-400 hover:bg-red-500/25' : 'bg-electric-500/15 text-electric-400 hover:bg-electric-500/25'}`}>
                    {t.status === 'Open' ? 'Close Ticket' : 'Reopen'}
                  </button>
                </div>
              </div>

              {/* Original Message */}
              <div className="flex gap-3 items-start mb-4">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-700 text-xs text-white">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1 rounded-xl bg-navy-800/50 p-3 border border-white/5">
                  <p className="text-sm text-slate-300">{t.message}</p>
                  <p className="mt-1 text-[10px] text-slate-500">{new Date(t.created_at).toLocaleString()}</p>
                </div>
              </div>

              {/* Admin Reply Input */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex gap-2">
                  <input
                    value={replyText[t.id] || ''}
                    onChange={(e) => setReplyText((prev) => ({ ...prev, [t.id]: e.target.value }))}
                    placeholder="Type your admin reply here..."
                    className="input-field flex-1 text-sm"
                  />
                  <button
                    onClick={() => sendReply(t.id)}
                    disabled={!replyText[t.id]?.trim() || replying[t.id]}
                    className="btn-primary px-4 py-2 text-sm disabled:opacity-50"
                  >
                    {replying[t.id] ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}