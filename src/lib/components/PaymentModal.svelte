<script>
  import { onMount } from 'svelte';
  
  let { onSuccess, onCancel } = $props();
  
  let isProcessing = $state(false);
  let step = $state('payment'); // 'payment' | 'processing' | 'success'
  let cardNumber = $state('');
  let expiryDate = $state('');
  let cvc = $state('');
  
  function handlePayment() {
    if (!cardNumber || !expiryDate || !cvc) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    isProcessing = true;
    step = 'processing';
    
    // Simulate payment processing with realistic timing
    setTimeout(() => {
      step = 'success';
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 3000);
  }
  
  function formatCardNumber(value) {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  }
  
  function formatExpiryDate(value) {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
  }
  
  onMount(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  });
</script>

<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div class="bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
    
    {#if step === 'payment'}
      <!-- Payment Form -->
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-serif font-bold text-foreground">Оплата отчета</h2>
          <button 
            aria-label="Close"
            onclick={onCancel}
            class="text-muted hover:text-foreground transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Order Summary -->
        <div class="bg-card rounded-lg p-4 mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-foreground">Полный отчет по локации</span>
            <span class="font-semibold">₽2,990</span>
          </div>
          <div class="text-sm text-muted mb-3">
            Анализ для категории "Кофейня" в городе Москва
          </div>
          <div class="border-t border-border pt-3">
            <div class="flex items-center justify-between font-semibold text-lg">
              <span>Итого:</span>
              <span class="text-accent">₽2,990</span>
            </div>
          </div>
        </div>
        
        <!-- Payment Methods -->
        <div class="space-y-4 mb-6">
          <div class="border border-border rounded-lg p-4 bg-accent/5 border-accent">
            <div class="flex items-center mb-3">
              <input type="radio" id="card" name="payment" checked class="mr-3">
              <label for="card" class="font-medium">Банковская карта</label>
            </div>
            
            <div class="space-y-3">
              <input 
                type="text" 
                bind:value={cardNumber}
                oninput={(e) => cardNumber = formatCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456" 
                maxlength="19"
                class="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              >
              <div class="grid grid-cols-2 gap-3">
                <input 
                  type="text" 
                  bind:value={expiryDate}
                  oninput={(e) => expiryDate = formatExpiryDate(e.target.value)}
                  placeholder="MM/YY" 
                  maxlength="5"
                  class="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                <input 
                  type="text" 
                  bind:value={cvc}
                  oninput={(e) => cvc = e.target.value.replace(/\D/g, '')}
                  placeholder="CVC" 
                  maxlength="3"
                  class="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                >
              </div>
            </div>
          </div>
          
          <div class="border border-border rounded-lg p-4 opacity-50">
            <div class="flex items-center">
              <input type="radio" id="sbp" name="payment" disabled class="mr-3">
              <label for="sbp" class="font-medium">СБП (скоро)</label>
            </div>
          </div>
        </div>
        
        <!-- Security Info -->
        <div class="bg-muted/30 rounded-lg p-4 mb-6">
          <div class="flex items-center text-sm text-muted">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
            </svg>
            Безопасная оплата через защищенное соединение
          </div>
        </div>
        
        <button 
          aria-label="Pay 2,990 rubles"
          onclick={handlePayment}
          disabled={isProcessing}
          class="w-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Оплатить ₽2,990
        </button>
      </div>
      
    {:else if step === 'processing'}
      <!-- Processing -->
      <div class="p-8 text-center">
        <div class="w-16 h-16 mx-auto mb-6">
          <div class="w-full h-full border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
        </div>
        <h3 class="text-xl font-serif font-bold text-foreground mb-3">Обрабатываем платеж</h3>
        <p class="text-muted">Пожалуйста, не закрывайте окно</p>
        <div class="mt-4 text-sm text-muted">
          Проверяем данные карты и списываем средства...
        </div>
      </div>
      
    {:else if step === 'success'}
      <!-- Success -->
      <div class="p-8 text-center">
        <div class="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <h3 class="text-xl font-serif font-bold text-foreground mb-3">Оплата прошла успешно!</h3>
        <p class="text-muted mb-6">Открываем полную версию отчета...</p>
        <div class="w-full bg-border rounded-full h-2">
          <div class="bg-green-500 h-2 rounded-full animate-pulse" style="width: 100%"></div>
        </div>
        <div class="mt-4 text-sm text-muted">
          Чек отправлен на вашу электронную почту
        </div>
      </div>
    {/if}
  </div>
</div>
