# 2079. Watering Plants

**Difficulty:** 🟡 Medium

**Companies:** Amadeus, Google, Kla Tencor
---

```
FUNCTION wateringPlants(plants, capacity):
    steps = 0; water = capacity
    FOR i ← 0 TO len(plants) - 1:
        steps += 1
        IF water < plants[i]:
            steps += 2 * i
            water = capacity
        water -= plants[i]
    RETURN steps
```
