
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';

interface Reminder {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  time: string;
  frequency: string;
  is_active: boolean;
}

export const useReminders = () => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchReminders();
    } else {
      setReminders([]);
      setLoading(false);
    }
  }, [user]);

  const fetchReminders = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reminders:', error);
      } else {
        setReminders(data || []);
      }
    } catch (error) {
      console.error('Error fetching reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const addReminder = async (reminder: Omit<Reminder, 'id' | 'user_id'>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { error } = await supabase
        .from('reminders')
        .insert({
          user_id: user.id,
          ...reminder
        });

      if (!error) {
        await fetchReminders();
      }

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const deleteReminder = async (reminderId: string) => {
    try {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', reminderId);

      if (!error) {
        await fetchReminders();
      }

      return { error };
    } catch (error) {
      return { error };
    }
  };

  return {
    reminders,
    loading,
    addReminder,
    deleteReminder,
    refetch: fetchReminders
  };
};
