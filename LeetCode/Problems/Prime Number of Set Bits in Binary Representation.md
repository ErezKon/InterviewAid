# 762. Prime Number of Set Bits in Binary Representation

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google
---

```
FUNCTION countPrimeSetBits(left, right):
    primes = {2,3,5,7,11,13,17,19}
    RETURN SUM(1 for i in range(left, right+1) if bin(i).count('1') in primes)
```
