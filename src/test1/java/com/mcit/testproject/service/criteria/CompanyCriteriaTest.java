package com.mcit.testproject.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class CompanyCriteriaTest {

    @Test
    void newCompanyCriteriaHasAllFiltersNullTest() {
        var companyCriteria = new CompanyCriteria();
        assertThat(companyCriteria).is(criteriaFiltersAre(filter -> filter == null));
    }

    @Test
    void companyCriteriaFluentMethodsCreatesFiltersTest() {
        var companyCriteria = new CompanyCriteria();

        setAllFilters(companyCriteria);

        assertThat(companyCriteria).is(criteriaFiltersAre(filter -> filter != null));
    }

    @Test
    void companyCriteriaCopyCreatesNullFilterTest() {
        var companyCriteria = new CompanyCriteria();
        var copy = companyCriteria.copy();

        assertThat(companyCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(filter -> filter == null)),
            criteria -> assertThat(criteria).isEqualTo(companyCriteria)
        );
    }

    @Test
    void companyCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var companyCriteria = new CompanyCriteria();
        setAllFilters(companyCriteria);

        var copy = companyCriteria.copy();

        assertThat(companyCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(filter -> filter != null)),
            criteria -> assertThat(criteria).isEqualTo(companyCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var companyCriteria = new CompanyCriteria();

        assertThat(companyCriteria).hasToString("CompanyCriteria{}");
    }

    private static void setAllFilters(CompanyCriteria companyCriteria) {
        companyCriteria.id();
        companyCriteria.companyName();
        companyCriteria.companyAddress();
        companyCriteria.companyDescription();
        companyCriteria.createDate();
        companyCriteria.distinct();
    }

    private static Condition<CompanyCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getCompanyName()) &&
                condition.apply(criteria.getCompanyAddress()) &&
                condition.apply(criteria.getCompanyDescription()) &&
                condition.apply(criteria.getCreateDate()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<CompanyCriteria> copyFiltersAre(CompanyCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getCompanyName(), copy.getCompanyName()) &&
                condition.apply(criteria.getCompanyAddress(), copy.getCompanyAddress()) &&
                condition.apply(criteria.getCompanyDescription(), copy.getCompanyDescription()) &&
                condition.apply(criteria.getCreateDate(), copy.getCreateDate()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
