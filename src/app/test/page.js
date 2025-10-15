'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    if (user) {
      supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', user.id)
        .then(({ data }) => setWatchlist(data || []))
    }
  }, [user])

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'REDACTED',
      password: 'REDACTED'
    })
    if (error) {
      console.error('Sign up error:', error)
      alert('Error: ' + error.message)
    }
    else alert('User created! Check email for confirmation.')
  }

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'REDACTED',
      password: 'REDACTED'
    })
    if (error) {
      console.error('Sign in error:', error)
      alert('Sign in error: ' + error.message)
    } else {
      alert('Signed in successfully!')
      window.location.reload() // Refresh to see user
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error:', error)
      alert('Sign out error: ' + error.message)
    } else {
      alert('Signed out successfully!')
      window.location.reload()
    }
  }

  const handleAddToWatchlist = async () => {
    if (!user) {
      alert('Please sign in first!')
      return
    }
    
    const { data, error } = await supabase
      .from('watchlist')
      .insert([{
        user_id: user.id,
        tmdb_id: '106', // Test TMDB ID
        media_title: 'Test Movie',
        media_type: 'movie'
      }])
      
    if (error) {
      console.error('Add error:', error)
      alert('Error: ' + error.message)
    } else {
      alert('Added to watchlist!')
    }
  }

  const handleForceAdd = async () => {
    // This simulates trying to add as another user (RLS should block it)
    const { data, error } = await supabase
      .from('watchlist')
      .insert([{
        user_id: '00000000-0000-0000-0000-000000000000', // Fake UUID
        tmdb_id: '99999',
        media_title: 'Unauthorized Test',
        media_type: 'movie'
      }])
      
    if (error) {
      console.error('Force add error:', error)
      alert('RLS Blocked! Error: ' + error.message) // Should show permission denied
    } else {
      alert('Unexpected: Added successfully (RLS failed!)')
    }
  }


  if (loading) return <p>Loading...</p>

  return (
  <div className="p-8">
    <h1>Supabase Connection Test</h1>
    <p>Current User: {user ? user.email : 'Not logged in'}</p>

    <button 
      onClick={handleSignUp}
      className="bg-blue-500 text-white p-2 rounded mt-4"
    >
      Test Sign Up
    </button>

    <button 
      onClick={handleSignIn}
      className="bg-green-500 text-white p-2 rounded mt-2"
    >
      Test Sign In
    </button>

    {user && (
      <button 
        onClick={handleSignOut}
        className="bg-red-500 text-white p-2 rounded mt-2"
      >
        Sign Out
      </button>
    )}

    <br/>

    <button 
      onClick={handleAddToWatchlist}
      className="bg-purple-500 text-white p-2 rounded mt-2"
      disabled={!user}
    >
      Add Test Movie to Watchlist
    </button>

    {/* // Add this button (only show when SIGNED IN to test RLS): */}
    {user && (
      <button 
        onClick={handleForceAdd}
        className="bg-red-600 text-white p-2 rounded mt-2"
      >
        Test RLS Security (Should Fail)
      </button>
    )}

    {watchlist.length > 0 && (
      <div className="mt-4">
        <h3>Your Watchlist:</h3>
        <ul>
          {watchlist.map(item => (
            <li key={item.id}>{item.media_title} ({item.media_type})</li>
          ))}
        </ul>
      </div>
    )}
  </div>
  )
}