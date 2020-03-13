import React from 'react';
import { Segment, Item, Label, Header } from 'semantic-ui-react';

export const MetaData = () => {
  return (
    <Segment clearing>
      <Header as='h2'>System Meta Data</Header>
      <Item.Group divided>
        <Item key='1'>
          <Item.Content>
            <Item.Header as='a'>Identification</Item.Header>
            <Item.Description>
              <div>
                <Label basic content='ConfigVer:' /> 1.2.0
              </div>
              <div>
                <Label basic content='BusinessUnit:' /> eAGV
              </div>
              <div>
                <Label basic content='EdgeHWRSN:' /> Ax_12598324
              </div>
              <div>
                <Label basic content='EdgeSWRVer:' /> Ax_2.5.3
              </div>
              <div>
                <Label basic content='BMSHWRSN:' /> EigerC63B124
              </div>
              <div>
                <Label basic content='BMSSWRVer:' /> EigerC63S456
              </div>
              <div>
                <Label basic content='CANMappingVer:' /> C63CANV100
              </div>
            </Item.Description>
          </Item.Content>
        </Item>

        <Item key='2'>
          <Item.Content>
            <Item.Header as='a'>System Description</Item.Header>
            <Item.Description>
              <div>
                <Label basic content='Technology:' /> LTO
              </div>
              <div>
                <Label basic content='ModConfig:' /> 6s4p
              </div>
              <div>
                <Label basic content='StrConfig:' /> StrConfig
              </div>
              <div>
                <Label basic content='NomVoltage:' /> 80V
              </div>
              <div>
                <Label basic content='NomCapacity:' /> 120Ah
              </div>
            </Item.Description>
          </Item.Content>
        </Item>

        <Item key='3'>
          <Item.Content>
            <Item.Header as='a'>Product Info</Item.Header>
            <Item.Description>
              <div>
                <Label basic content='Cusotmer:' /> Generic_1
              </div>
              <div>
                <Label basic content='Location:' /> somewhere
              </div>
              <div>
                <Label basic content='FabricationDate:' /> 01.01.2020
              </div>
              <div>
                <Label basic content='InstallationDate:' /> 01.01.2020
              </div>
              <div>
                <Label basic content='ContactMail:' /> support@leclanche.com
              </div>
              <div>
                <Label basic content='ContactTel:' /> 004121021021021
              </div>
            </Item.Description>
          </Item.Content>
        </Item>
        <Item key='4'>
          <Item.Content>
            <Item.Header as='a'>CAN Info</Item.Header>
            <Item.Description>
              <div>
                <Label basic content='CANChannel:' /> 1
              </div>
              <div>
                <Label basic content='CANSpeed:' /> 500
              </div>
              <div>
                <Label basic content='CANTimeout:' /> 10
              </div>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};
