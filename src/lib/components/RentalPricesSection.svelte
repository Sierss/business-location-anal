<script lang="ts">
  let { searchParams, isPaid } = $props();
  
  const fullRentalData = [
    { 
      street: 'ул. Тверская', 
      price: 5200, 
      trend: 'up', 
      availability: 'Низкая',
      avgSize: 45,
      utilities: 150
    },
    { 
      street: 'Новый Арбат', 
      price: 4800, 
      trend: 'stable', 
      availability: 'Средняя',
      avgSize: 52,
      utilities: 140
    },
    { 
      street: 'ул. Петровка', 
      price: 4500, 
      trend: 'down', 
      availability: 'Высокая',
      avgSize: 38,
      utilities: 130
    },
    { 
      street: 'Садовое кольцо', 
      price: 3800, 
      trend: 'up', 
      availability: 'Средняя',
      avgSize: 48,
      utilities: 120
    },
    { 
      street: 'ул. Остоженка', 
      price: 5500, 
      trend: 'stable', 
      availability: 'Низкая',
      avgSize: 42,
      utilities: 160
    }
  ];
  
  function getTrendIcon(trend) {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  }
  
  function getTrendColor(trend) {
    switch(trend) {
      case 'up': return 'text-red-500';
      case 'down': return 'text-green-500';
      default: return 'text-muted';
    }
  }
</script>

<div class="bg-card rounded-xl p-6 shadow-lg border border-border">
  <h2 class="text-2xl font-serif font-bold text-foreground mb-4">
    Стоимость аренды коммерческой недвижимости
  </h2>
  
  <div class="space-y-4">
    {#each (isPaid ? fullRentalData : fullRentalData.slice(0, 3)) as rental}
      <div class="flex justify-between items-center p-4 bg-background rounded-lg border border-border">
        <div class="flex-1">
          <div class="flex items-center space-x-2">
            <span class="font-medium text-foreground">{rental.street}</span>
            {#if isPaid}
              <span class="text-lg">{getTrendIcon(rental.trend)}</span>
            {/if}
          </div>
          {#if isPaid}
            <div class="text-sm text-muted mt-1">
              Средняя площадь: {rental.avgSize} м² • Коммунальные: ₽{rental.utilities}/м²
            </div>
          {/if}
        </div>
        
        <div class="text-right">
          <div class="flex items-center space-x-2">
            <span class="text-xl font-bold text-accent">
              ₽{isPaid ? rental.price.toLocaleString() : `${Math.floor(rental.price/100)*100}+`}/м²
            </span>
            {#if isPaid}
              <span class="text-sm {getTrendColor(rental.trend)}">
                {rental.trend === 'up' ? '+5%' : rental.trend === 'down' ? '-3%' : '0%'}
              </span>
            {/if}
          </div>
          {#if isPaid}
            <div class="text-sm text-muted">
              Доступность: {rental.availability}
            </div>
          {/if}
        </div>
      </div>
    {/each}
    
    {#if !isPaid}
      <div class="text-center py-4 text-muted border-2 border-dashed border-border rounded-lg">
        + еще {fullRentalData.length - 3} улицы в полной версии
      </div>
    {/if}
  </div>
  
  {#if isPaid}
    <!-- Added rental market analysis for paid version -->
    <div class="mt-6 grid md:grid-cols-3 gap-4">
      <div class="text-center p-4 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg">
        <div class="text-2xl font-bold text-foreground mb-2">₽4,560</div>
        <div class="text-sm text-muted">Средняя цена по району</div>
      </div>
      
      <div class="text-center p-4 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg">
        <div class="text-2xl font-bold text-foreground mb-2">45 м²</div>
        <div class="text-sm text-muted">Оптимальная площадь</div>
      </div>
      
      <div class="text-center p-4 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg">
        <div class="text-2xl font-bold text-foreground mb-2">₽205,200</div>
        <div class="text-sm text-muted">Месячная аренда 45м²</div>
      </div>
    </div>
    
    <div class="mt-4 p-4 bg-muted/20 rounded-lg">
      <h4 class="font-semibold text-foreground mb-2">Рекомендации по аренде</h4>
      <ul class="text-sm text-muted space-y-1">
        <li>• Лучшее соотношение цена/качество: ул. Петровка</li>
        <li>• Самая высокая проходимость: ул. Тверская</li>
        <li>• Растущий район с потенциалом: Садовое кольцо</li>
      </ul>
    </div>
  {/if}
</div>
