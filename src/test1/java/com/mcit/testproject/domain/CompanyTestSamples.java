package com.mcit.testproject.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CompanyTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Company getCompanySample1() {
        return new Company().id(1L).companyName("companyName1").companyAddress("companyAddress1").companyDescription("companyDescription1");
    }

    public static Company getCompanySample2() {
        return new Company().id(2L).companyName("companyName2").companyAddress("companyAddress2").companyDescription("companyDescription2");
    }

    public static Company getCompanyRandomSampleGenerator() {
        return new Company()
            .id(longCount.incrementAndGet())
            .companyName(UUID.randomUUID().toString())
            .companyAddress(UUID.randomUUID().toString())
            .companyDescription(UUID.randomUUID().toString());
    }
}
