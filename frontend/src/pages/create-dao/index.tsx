import { CreateDaoStepper } from "@/components/create-dao/CreateDaoStepper";
import { ReviewDaoInfo } from "@/components/create-dao/ReviewDaoInfo";
import { SetDaoInfo } from "@/components/create-dao/SetDaoInfo";
import { SetReward } from "@/components/create-dao/SetReward";
import { WaitingDeploy } from "@/components/create-dao/WaitingDeploy";
import { Center, Container } from "@mantine/core";

const Page = () => {
    const step1 = () => {
        return (
            <Container mt="md">
                <SetDaoInfo />
            </Container>
        );
    };

    const step2 = () => {
        return (
            <Container mt="md">
                <SetReward />
            </Container>
        );
    };

    const step3 = () => {
        return (
            <Container mt="md">
                <ReviewDaoInfo />
            </Container>
        );
    };

    const completedStep = () => {
        return (
            <Container mt="md" p="xl">
                <WaitingDeploy />
            </Container>
        );
    }

    return <Container my="xl">
        <CreateDaoStepper
            step1Component={step1()}
            step2Component={step2()}
            step3Component={step3()}
            completedComponent={completedStep()}
        />
    </Container>

}

Page.noNavbar = true;
export default Page