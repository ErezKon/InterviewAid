# 3206. Alternating Groups I

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Samsara
---

```
FUNCTION numberOfAlternatingGroups(colors):
    n = len(colors); count = 0
    FOR i ← 0 TO n - 1:
        IF colors[i] != colors[(i-1)%n] AND colors[i] != colors[(i+1)%n]:
            count += 1
    RETURN count
```
