
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';

interface EmergencyContact {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  relationship: string;
  photo?: string;
}

export const useEmergencyContacts = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchContacts();
    } else {
      setContacts([]);
      setLoading(false);
    }
  }, [user]);

  const fetchContacts = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contacts:', error);
      } else {
        setContacts(data || []);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact: Omit<EmergencyContact, 'id' | 'user_id'>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { error } = await supabase
        .from('emergency_contacts')
        .insert({
          user_id: user.id,
          ...contact
        });

      if (!error) {
        await fetchContacts();
      }

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const deleteContact = async (contactId: string) => {
    try {
      const { error } = await supabase
        .from('emergency_contacts')
        .delete()
        .eq('id', contactId);

      if (!error) {
        await fetchContacts();
      }

      return { error };
    } catch (error) {
      return { error };
    }
  };

  return {
    contacts,
    loading,
    addContact,
    deleteContact,
    refetch: fetchContacts
  };
};
