# 2582. Pass the Pillow

**Difficulty:** 🟢 Easy

**Companies:** Bloomberg, Google, Mathworks
---

```
FUNCTION passThePillow(n, time):
    cycle = 2 * (n - 1)
    time %= cycle
    RETURN time + 1 IF time < n ELSE 2*n - 1 - time
```
