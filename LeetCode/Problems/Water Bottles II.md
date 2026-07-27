# 3100. Water Bottles II

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Meta
---

```
FUNCTION maxBottlesDrunk(numBottles, numExchange):
    drunk = 0; empty = 0
    WHILE numBottles > 0:
        drunk += numBottles; empty += numBottles; numBottles = 0
        WHILE empty >= numExchange:
            empty -= numExchange; numBottles += 1; numExchange += 1
    RETURN drunk
```
