import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabase';

// ---------- SERVICE PAGES ----------
export function useServicePage(slug: string) {
  return useQuery({
    queryKey: ['service_page', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    enabled: !!slug,
  });
}

export function useAllServicePages() {
  return useQuery({
    queryKey: ['service_pages', 'list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_pages')
        .select('slug, title, subtitle, hero_image, order_index')
        .eq('is_active', true)
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
}

// ---------- OFFERS ----------
export function useOffers(category?: string, campaign?: string) {
  let query = supabase
    .from('offers')
    .select('*')
    .eq('is_active', true)
    .or('deadline.is.null', 'deadline.gt.now()')
    .order('created_at', { ascending: false });

  if (category) query = query.eq('category', category);
  if (campaign) query = query.eq('campaign', campaign);

  return useQuery({
    queryKey: ['offers', category, campaign],
    queryFn: async () => {
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
  });
}

export function useFeaturedOffers() {
  return useQuery({
    queryKey: ['offers', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .eq('featured', true)
        .or('deadline.is.null', 'deadline.gt.now()')
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 2,
  });
}

// ---------- ADMIN MUTATIONS ----------
export function useAdminServicePages() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: async (payload: any) => {
      const { data, error } = await supabase.from('service_pages').insert(payload).select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service_pages'] });
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, ...payload }: any) => {
      const { data, error } = await supabase.from('service_pages').update(payload).eq('id', id).select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service_pages'] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('service_pages').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service_pages'] });
    },
  });

  return { create, update, remove };
}

export function useAdminOffers() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: async (payload: any) => {
      const { data, error } = await supabase.from('offers').insert(payload).select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, ...payload }: any) => {
      const { data, error } = await supabase.from('offers').update(payload).eq('id', id).select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('offers').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  return { create, update, remove };
}