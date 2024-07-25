import { createClient } from '@supabase/supabase-js'
import './supabase';

export const client = createClient("https://jmlaffbdapwhgwovikel.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbGFmZmJkYXB3aGd3b3Zpa2VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTY5Njg1OSwiZXhwIjoyMDM1MjcyODU5fQ.YoFiCmxkgM4u9XFN1Su_qxXtNsv4MIgsx-Sh7UfxIXM")