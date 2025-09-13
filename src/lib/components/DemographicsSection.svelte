<script lang="ts">
  let { searchParams, isPaid } = $props();
  
  const fullDemographics = {
    districts: [
      {
        name: 'Центральный',
        population: 125000,
        avgIncome: 65000,
        ageGroups: { '18-25': 22, '26-35': 28, '36-45': 25, '46+': 25 },
        education: { higher: 78, secondary: 22 },
        metroDistance: 5,
        footTraffic: 15000
      },
      {
        name: 'Тверской',
        population: 98000,
        avgIncome: 58000,
        ageGroups: { '18-25': 25, '26-35': 30, '36-45': 23, '46+': 22 },
        education: { higher: 72, secondary: 28 },
        metroDistance: 8,
        footTraffic: 12000
      },
      {
        name: 'Арбат',
        population: 87000,
        avgIncome: 72000,
        ageGroups: { '18-25': 20, '26-35': 32, '36-45': 28, '46+': 20 },
        education: { higher: 85, secondary: 15 },
        metroDistance: 3,
        footTraffic: 18000
      }
    ]
  };
  
  let selectedDistrict = $state(fullDemographics.districts[0]);
</script>

<div class="bg-card rounded-xl p-6 shadow-lg border border-border">
  <h2 class="text-2xl font-serif font-bold text-foreground mb-4">
    Демография районов
  </h2>
  
  {#if isPaid}
    <!-- Added district selector for paid version -->
    <div class="mb-6">
      <div class="flex space-x-2">
        {#each fullDemographics.districts as district}
          <button 
            onclick={() => selectedDistrict = district}
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {
              selectedDistrict.name === district.name 
                ? 'bg-accent text-accent-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }"
          >
            {district.name}
          </button>
        {/each}
      </div>
    </div>
  {/if}
  
  <div class="grid md:grid-cols-3 gap-4 mb-6">
    <div class="text-center p-4 bg-background rounded-lg">
      <div class="text-2xl font-bold text-foreground mb-2">
        {isPaid ? `₽${selectedDistrict.avgIncome.toLocaleString()}` : '₽45,000+'}
      </div>
      <div class="text-sm text-muted">Средний доход</div>
    </div>
    
    <div class="text-center p-4 bg-background rounded-lg">
      <div class="text-2xl font-bold text-foreground mb-2">
        {isPaid ? selectedDistrict.population.toLocaleString() : '125,000+'}
      </div>
      <div class="text-sm text-muted">Жителей в районе</div>
    </div>
    
    <div class="text-center p-4 bg-background rounded-lg">
      <div class="text-2xl font-bold text-foreground mb-2">
        {isPaid ? `${selectedDistrict.metroDistance} мин` : '8+ мин'}
      </div>
      <div class="text-sm text-muted">До ближайшего метро</div>
    </div>
  </div>
  
  {#if isPaid}
    <!-- Added detailed demographic breakdown for paid version -->
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-background rounded-lg p-4">
        <h4 class="font-semibold text-foreground mb-3">Возрастные группы</h4>
        <div class="space-y-2">
          {#each Object.entries(selectedDistrict.ageGroups) as [age, percentage]}
            <div class="flex items-center justify-between">
              <span class="text-sm text-muted">{age} лет</span>
              <div class="flex items-center space-x-2">
                <div class="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div class="h-full bg-accent rounded-full" style="width: {percentage}%"></div>
                </div>
                <span class="text-sm font-medium w-8">{percentage}%</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="bg-background rounded-lg p-4">
        <h4 class="font-semibold text-foreground mb-3">Образование</h4>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted">Высшее</span>
            <div class="flex items-center space-x-2">
              <div class="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div class="h-full bg-secondary rounded-full" style="width: {selectedDistrict.education.higher}%"></div>
              </div>
              <span class="text-sm font-medium w-8">{selectedDistrict.education.higher}%</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted">Среднее</span>
            <div class="flex items-center space-x-2">
              <div class="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div class="h-full bg-secondary rounded-full" style="width: {selectedDistrict.education.secondary}%"></div>
              </div>
              <span class="text-sm font-medium w-8">{selectedDistrict.education.secondary}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-6 p-4 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg border border-secondary/20">
      <h4 class="font-semibold text-foreground mb-2">Проходимость района</h4>
      <div class="flex items-center justify-between">
        <span class="text-muted">Средний пешеходный трафик</span>
        <span class="text-xl font-bold text-secondary">{selectedDistrict.footTraffic.toLocaleString()} чел/день</span>
      </div>
      <div class="text-sm text-muted mt-2">
        Пик активности: 8:00-10:00 и 18:00-20:00
      </div>
    </div>
  {/if}
</div>
