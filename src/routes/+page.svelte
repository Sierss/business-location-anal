<script>
  import LandingPage from '$lib/components/LandingPage.svelte';
  import ReportGenerator from '$lib/components/ReportGenerator.svelte';
  
  let currentView = $state('landing'); // 'landing' | 'report'
  let searchParams = $state({ category: '', city: '' });
  
  function handleStartAnalysis(params) {
    searchParams = params;
    currentView = 'report';
  }
  
  function handleBackToLanding() {
    currentView = 'landing';
  }
</script>

<main class="min-h-screen bg-background">
  {#if currentView === 'landing'}
    <LandingPage onStartAnalysis={handleStartAnalysis} />
  {:else if currentView === 'report'}
    <ReportGenerator 
      {searchParams} 
      onBack={handleBackToLanding} 
    />
  {/if}
</main>
