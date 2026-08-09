import { supabase } from './supabase';

export function useAudit() {
  const log = async (
    action: 'INSERT' | 'UPDATE' | 'DELETE',
    tableName: string,
    recordId: string,
    oldData?: any,
    newData?: any
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('audit_logs').insert({
        user_id: user.id,
        user_email: user.email,
        action,
        table_name: tableName,
        record_id: recordId,
        old_data: oldData || null,
        new_data: newData || null,
        ip: 'client-side',
      });
    } catch (error) {
      console.warn('Audit log failed:', error);
    }
  };

  return { log };
}