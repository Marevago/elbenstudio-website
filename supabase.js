import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://vygjxisbbinuthcwjewc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5Z2p4aXNiYmludXRoY3dqZXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MjM1MDQsImV4cCI6MjA2MjQ5OTUwNH0.k4VQEuev97ow7OqjkwsZNEIzLCw5nMWLV_fuarSBY6M'

export const supabase = createClient(supabaseUrl, supabaseKey)
