import { useLocale } from "@/i18n/useLocale";
import { Stepper, Group, Button } from "@mantine/core";
import { Component, useState } from "react";

interface Props {
    step1Component: JSX.Element;
    step2Component: JSX.Element;
    step3Component: JSX.Element;
    completedComponent: JSX.Element;
}

export const CreateDaoStepper = (props: Props) => {
    const { t } = useLocale();
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Stepper active={active} breakpoint="sm" >
                <Stepper.Step label={t.CreateDao.Step1.Title} description={t.CreateDao.Step1.SubTitle}>
                    {props.step1Component}
                </Stepper.Step>
                <Stepper.Step label={t.CreateDao.Step2.Title} description={t.CreateDao.Step2.SubTitle}>
                    {props.step2Component}
                </Stepper.Step>
                <Stepper.Step label={t.CreateDao.Step3.Title} description={t.CreateDao.Step3.SubTitle}>
                    {props.step3Component}
                </Stepper.Step>
                <Stepper.Completed>
                    {props.completedComponent}
                </Stepper.Completed>
            </Stepper>

            <Group position="center" mt="xl">
                {active > 0 && (
                    <Button variant="default" onClick={prevStep}>Back</Button>)}
                {active < 3 && (
                    <Button onClick={nextStep}>Next step</Button>
                )}
            </Group>
        </>
    );
}
