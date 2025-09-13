<script>
  import ReportGenerationAnimation from './ReportGenerationAnimation.svelte';
  import ReportPreview from './ReportPreview.svelte';
  
  let { searchParams, onBack } = $props();
  
  let currentStep = $state('generating'); // 'generating' | 'preview' | 'full'
  let isPaid = $state(false);
  
  function handleGenerationComplete() {
    currentStep = 'preview';
  }
  
  function handlePayment() {
    isPaid = true;
    currentStep = 'full';
  }
  
  function handleBackToPreview() {
    currentStep = 'preview';
  }
  
  function handleBackClick() {
    onBack();
  }
</script>

<div class="min-h-screen bg-background">
  <!-- Header -->
  <header class="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button 
            onclick={handleBackClick}
            class="flex items-center text-muted hover:text-foreground transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Назад
          </button>
          <div class="h-6 w-px bg-border"></div>
          <h1 class="text-xl font-serif font-bold text-foreground">
            Анализ локации: {searchParams.category} в {searchParams.city}
          </h1>
        </div>
        
        <div class="flex items-center space-x-2">
          <div class="flex items-center space-x-1">
            {#each ['generating', 'preview', 'full'] as step, stepIndex}
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 {
                  currentStep === step ? 'bg-primary text-primary-foreground' :
                  (currentStep === 'preview' && step === 'generating') || (currentStep === 'full' && (step === 'generating' || step === 'preview')) ? 'bg-accent text-accent-foreground' :
                  'bg-muted text-muted-foreground'
                }">
                  {stepIndex + 1}
                </div>
                {#if stepIndex < 2}
                  <div class="w-8 h-px bg-border mx-2"></div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </header>
  
  <!-- Content -->
  <main class="flex-1">
    {#if currentStep === 'generating'}
      <ReportGenerationAnimation 
        searchParams={searchParams} 
        onComplete={handleGenerationComplete} 
      />
    {:else if currentStep === 'preview'}
      <ReportPreview 
        searchParams={searchParams} 
        isPaid={isPaid}
        onPayment={handlePayment}
        onBack={handleBackToPreview}
      />
    {:else if currentStep === 'full'}
      <ReportPreview 
        searchParams={searchParams} 
        isPaid={true}
        onPayment={handlePayment}
        onBack={handleBackToPreview}
      />
    {/if}
  </main>
</div>
