# 2517. Maximum Tastiness of Candy Basket

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Bloomberg, Phonepe
---

```
FUNCTION maximumTastiness(price, k):
    SORT price
    lo, hi = 0, price[-1] - price[0]
    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        // Greedy: count how many candies with min gap mid
        count = 1; prev = price[0]
        FOR p IN price:
            IF p - prev >= mid: count += 1; prev = p
        IF count >= k: lo = mid
        ELSE: hi = mid - 1
    RETURN lo
```
